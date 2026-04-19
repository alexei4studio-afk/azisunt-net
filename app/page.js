// app/page.js  — Server Component (implicit în Next.js App Router)
//
// getSortedPostsData() este SINCRONĂ (nu returnează Promise),
// deci nu avem nevoie de async/await aici.
// Dacă am face `const posts = await getSortedPostsData()` pe o funcție sync,
// am primi de fapt Promise { [] } în loc de [], pentru că await pe o valoare
// non-Promise o înfășoară automat — dar în acest caz specific NU strică.
// Totuși, forma corectă și clară este fără async/await.

import { getSortedPostsData } from "../lib/posts";
import HomeClient from "./HomeClient";

// Next.js va executa acest Server Component la build time (SSG) sau
// la request time (SSR), ambele pe server unde fs este disponibil.
export default function Page() {
  const allPostsData = getSortedPostsData();

  // Ultimele 3 postări pentru secțiunea Knowledge Hub de pe homepage
  const latestPosts = allPostsData.slice(0, 3);

  // Pasăm datele serializable (plain objects, nu instanțe de clasă)
  // către Client Component — Next.js serializează automat prin JSON.
  return <HomeClient latestPosts={latestPosts} />;
}