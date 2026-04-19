import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from 'remark';
import html from 'remark-html';

const POSTS_DIR = path.join(process.cwd(), "content/blog");

/**
 * Returnează toate articolele din content/blog/*.md sortate.
 */
export function getSortedPostsData() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.warn("[posts.js] Folderul content/blog/ nu există.");
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title:    data.title    ?? "Fără titlu",
      date:     data.date     ?? "",
      category: data.category ?? "General",
      tag:      data.tag      ?? data.category ?? "General",
      featured: data.featured ?? false,
      excerpt:  data.excerpt  ?? "",
      readTime: data.readTime ?? "5 min",
      stats:    data.stats    ?? null,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (!isNaN(dateA) && !isNaN(dateB)) return dateB - dateA;
    return 0;
  });
}

/**
 * Returnează datele complete pentru un singur articol.
 */
export async function getPostData(slug) {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Procesare rapidă (importurile sunt deja sus)
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...data,
  };
}