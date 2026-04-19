import { getSortedPostsData } from "../lib/posts";
import HomeClient from "./HomeClient";

export default function Page() {
  // Această funcție rulează pe SERVER, deci 'fs' nu mai dă eroare
  const allPostsData = getSortedPostsData();
  
  // Selectăm ultimele 3 postări pentru Knowledge Hub
  const latestPosts = allPostsData.slice(0, 3);

  return <HomeClient latestPosts={latestPosts} />;
}