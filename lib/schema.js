const BASE = "https://azisunt.net";

export function organizationSchema(overrides = {}) {
  return { "@type": "Organization", name: "CapeSystem", url: BASE, ...overrides };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    name: "CapeSystem",
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webpageSchema({ name, description, url, breadcrumb, mainEntity }) {
  return {
    "@type": "WebPage",
    name,
    description,
    url,
    ...(breadcrumb != null ? { breadcrumb } : {}),
    ...(mainEntity != null ? { mainEntity } : {}),
  };
}

export function serviceSchema({ type = "Service", id, name, description, url, provider, serviceType, areaServed, offers } = {}) {
  return {
    "@type": type,
    ...(id != null ? { "@id": id } : {}),
    name,
    ...(description != null ? { description } : {}),
    ...(url != null ? { url } : {}),
    ...(provider != null ? { provider } : {}),
    ...(serviceType != null ? { serviceType } : {}),
    ...(areaServed != null ? { areaServed } : {}),
    ...(offers != null ? { offers } : {}),
  };
}

export function articleSchema({ headline, description, url, datePublished, author, publisher } = {}) {
  return {
    "@type": "Article",
    headline,
    description,
    url,
    ...(datePublished != null ? { datePublished } : {}),
    ...(author != null ? { author } : {}),
    ...(publisher != null ? { publisher } : {}),
  };
}

export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, item }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item,
    })),
  };
}

export function graphSchema(...items) {
  return {
    "@context": "https://schema.org",
    "@graph": items,
  };
}
