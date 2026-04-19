import { getSortedPostsData } from "../lib/posts";
import HomeClient from "./HomeClient";
import fs from "fs";
import path from "path";

export default function Page() {
  const postsPath = path.join(process.cwd(), "content/blog");
  let debugInfo = "";

  try {
    const exists = fs.existsSync(postsPath);
    const files = exists ? fs.readdirSync(postsPath) : "FOLDERUL NU EXISTA";
    debugInfo = `Cale: ${postsPath} | Exista: ${exists} | Fisiere: ${JSON.stringify(files)}`;
  } catch (e) {
    debugInfo = `Eroare: ${e.message}`;
  }

  const allPostsData = getSortedPostsData();
  
  return (
    <>
      {/* Mesaj de debug vizibil doar tie sus pe pagina */}
      <div style={{background: 'red', color: 'white', padding: '10px', fontSize: '10px', position: 'fixed', top: 0, zIndex: 9999}}>
        {debugInfo}
      </div>
      <HomeClient latestPosts={allPostsData.slice(0, 3)} />
    </>
  );
}