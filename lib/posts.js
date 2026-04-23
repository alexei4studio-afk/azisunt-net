import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function readFileLF(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n").trim();
}

// Folosită pentru pagina principală (Home)
export function getSortedPostsData() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const allFiles = fs.readdirSync(POSTS_DIR);
  const mdFiles = allFiles.filter((f) => f.endsWith(".md"));

  return mdFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const { data } = matter(readFileLF(path.join(POSTS_DIR, fileName)));
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "1970-01-01",
      excerpt: data.excerpt ?? "",
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

// REPARARE: Această funcție lipsea și cauza eroarea pe Vercel
export async function getPostData(slug) {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) return null;

  const raw = readFileLF(fullPath);
  const { data, content } = matter(raw);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);

  return {
    slug,
    contentHtml: processedContent.toString(),
    ...data,
    title: data.title ?? slug,
  };
}