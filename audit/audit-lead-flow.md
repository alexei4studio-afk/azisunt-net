# Audit Lead Flow

## Current flow

1. User completes the `/audit` funnel (5 steps: domain → identity → answers → contact → results).
2. On step 5, `AuditClient.js` calls `computeAuditScores()` client-side to produce per-category scores and an overall score (0–100).
3. After rendering results, a fire-and-forget `fetch("POST /api/audit-lead")` sends the full lead payload to the server. The UI is never blocked by this call.
4. `app/api/audit-lead/route.js` validates the payload, runs `qualifyLead()`, and:
   - Appends the enriched lead to `data/audit-leads.json` (best-effort, see below).
   - Optionally POSTs to `AZISUNT_AUDIT_WEBHOOK_URL` (see Notification hook).
5. The API returns `{ ok: true, id }` (plus `notificationOk` when a webhook is configured). `AuditClient.js` shows a subtle status line: green for saved, dimmed for failure.

## Lead qualification fields

| Field              | Logic                                                                                  |
|--------------------|----------------------------------------------------------------------------------------|
| `leadTemperature`  | `hot` = score ≤ 50 AND email present; `warm` = score ≤ 70 + email OR score ≤ 50 + no email; `cold` = otherwise |
| `painPoints`       | Up to 3 category labels with score < 50, sorted lowest-first                          |
| `suggestedOffer`   | score < 40 → website rebuild; < 60 → Plan Pro; < 75 → audit call; ≥ 75 → SEO-GEO package |
| `nextAction`       | Romanian sales action string keyed to temperature                                     |

## Notification hook

Set `AZISUNT_AUDIT_WEBHOOK_URL` in the Vercel environment or `.env.local`. When present, the route POSTs the full lead JSON to that URL with a 5-second timeout. Failure does not affect the 201 response — it only sets `notificationOk: false` in the response body. The webhook URL is never exposed to the client.

Suitable targets: Make / n8n HTTP webhook, Slack incoming webhook, internal CRM endpoint.

## App backend forwarding

After local validation, `route.js` forwards the enriched lead to the `app.azisunt.net` backend:

- **Endpoint**: `process.env.AZISUNT_APP_INBOUND_URL` (default: `https://app.azisunt.net/api/inbound/audit-lead`)
- **Auth header**: `X-AZISUNT-INBOUND-SECRET` — value from `process.env.AZISUNT_INBOUND_SECRET`
- **Required Vercel env var**: `AZISUNT_INBOUND_SECRET` (must match the value in `.env` on `app.azisunt.net`)
- **Behavior when secret is missing**: forwarding is skipped; API still returns `{ ok: true, forwarded: false }` — user request never fails
- **Behavior on network/HTTP error**: same as above — `forwarded: false`, no user impact
- **Behavior on success**: API returns `{ ok: true, forwarded: true }`

The forwarded payload is the full enriched lead object (including `leadTemperature`, `painPoints`, `suggestedOffer`, `nextAction`).

To verify the full chain end-to-end:

```bash
AZISUNT_INBOUND_SECRET=<secret> npm run test:audit-forwarding
```

This tests (1) a direct POST to the app backend with the auth header, and (2) a POST to the public audit API (default `http://localhost:3000/api/audit-lead`), reporting both statuses and the `forwarded` flag from the public API response. Override the public URL with `AZISUNT_PUBLIC_AUDIT_API_URL=https://azisunt.net/api/audit-lead`.

## JSON storage limitation on Vercel

Vercel's serverless runtime mounts the project on a read-only filesystem. `fs.writeFileSync` to `data/audit-leads.json` **will silently fail** in production. The route wraps the write in a try/catch so the API still returns 201.

This means `data/audit-leads.json` and `npm run leads:summary` are only useful in local development or on a self-hosted Node.js server (e.g., a VPS, Railway, Render).

## Future DB / CRM upgrade path

To persist leads in production, replace the `fs.writeFileSync` block in `route.js` with one of the following — no other changes needed:

| Option              | How                                                                     |
|---------------------|-------------------------------------------------------------------------|
| **Vercel Postgres** | `@vercel/postgres` — `INSERT INTO leads VALUES (...)` in the same route |
| **PlanetScale / Neon** | Standard MySQL / Postgres client — same pattern                      |
| **Airtable API**    | `fetch("https://api.airtable.com/v0/...")` — no SDK needed              |
| **Notion API**      | `fetch` to Notion databases endpoint                                    |
| **n8n / Make**      | Already covered by the webhook hook — point it at a CRM trigger         |

The `qualifyLead()` function and all enriched fields travel with the lead regardless of storage backend, so qualification logic does not need to change.
