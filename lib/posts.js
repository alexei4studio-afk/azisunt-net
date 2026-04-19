import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from 'remark';
import html from 'remark-html';

// Folosim process.cwd() asigurat pentru Vercel
const POSTS_DIR = path.join(process.cwd(), "content/blog");

export function getSortedPostsData() {
  try {
    if (!fs.existsSync(POSTS_DIR)) {
      console.error("FOLDERUL NU EXISTA LA CALEA:", POSTS_DIR);
      return [];
    }
    const fileNames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
    
    return fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
      const { data } = matter(fileContents);
      return { slug, ...data };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error("Eroare la citirea postarilor:", err);
    return [];
  }
}

export async function getPostData(slug) {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  
  return { 
    slug, 
    contentHtml: processedContent.toString(), 
    ...data 
  };
}