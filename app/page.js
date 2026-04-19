import { getSortedPostsData } from "../lib/posts";
import HomeClient from "./HomeClient";

export default function Page() {
  // Luăm datele reale prin motorul lib/posts.js
  const allPostsData = getSortedPostsData();
  
  // Trimitem primele 3 postări către designul de pe Home
  return <HomeClient latestPosts={allPostsData.slice(0, 3)} />;
}