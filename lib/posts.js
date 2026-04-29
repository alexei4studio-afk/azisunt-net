import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function readFileLF(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n").trim();
}

export function getSortedPostsData() {
  console.log("[posts] POSTS_DIR:", POSTS_DIR);
  if (!fs.existsSync(POSTS_DIR)) {
    console.error("[posts] ❌ Folder inexistent:", POSTS_DIR);
    try {
      console.log("[posts] Conținut cwd():", fs.readdirSync(process.cwd()));
    } catch (_) {}
    return [];
  }

  const allFiles = fs.readdirSync(POSTS_DIR);
  console.log("[posts] Fișiere găsite:", allFiles);

  const mdFiles = allFiles.filter((f) => f.endsWith(".md"));
  if (mdFiles.length === 0) {
    console.warn("[posts] ⚠️  Niciun .md în:", POSTS_DIR);
    return [];
  }

  const posts = mdFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(POSTS_DIR, fileName);
    console.log("[posts] Citire fisier:", filePath);
    const raw = readFileLF(filePath);
    const { data } = matter(raw);
    if (!data.title) {
      console.warn(`[posts] ⚠️  Lipsă 'title' în frontmatter pentru: ${slug}`);
    }
    return {
      slug,
      title:    data.title    ?? slug,
      date:     data.date     ?? "1970-01-01",
      category: data.category ?? "",
      tag:      data.tag      ?? "",
      featured: data.featured ?? false,
      excerpt:  data.excerpt  ?? "",
      readTime: data.readTime ?? "5 min",
      stats:    data.stats    ?? null,
    };
  });

  return posts.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    if (isNaN(da.getTime())) return 1;
    if (isNaN(db.getTime())) return -1;
    return db.getTime() - da.getTime();
  });
}

export async function getPostData(slug) {
  const safeSlug = path.basename(slug);
  const fullPath = path.join(POSTS_DIR, `${safeSlug}.md`);
  console.log("[posts] Citire fisier:", fullPath);

  if (!fs.existsSync(fullPath)) {
    console.error("[posts] ❌ Fișier inexistent:", fullPath);
    try {
      console.log("[posts] Conținut folder:", fs.readdirSync(POSTS_DIR));
    } catch (_) {}
    return null;
  }

  const raw = readFileLF(fullPath);
  const { data, content } = matter(raw);
  console.log("[posts] Frontmatter extras:", JSON.stringify(data));
  console.log("[posts] Preview conținut:", content.slice(0, 120));

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);
  const contentHtml = processedContent.toString();

  if (!contentHtml.trim()) {
    console.warn("[posts] ⚠️  contentHtml GOLUȚ pentru:", safeSlug);
  }

  return {
    slug:        safeSlug,
    contentHtml,
    title:       data.title    ?? safeSlug,
    date:        data.date     ?? "",
    category:    data.category ?? "",
    tag:         data.tag      ?? "",
    featured:    data.featured ?? false,
    excerpt:     data.excerpt  ?? "",
    readTime:    data.readTime ?? "5 min",
    stats:       data.stats    ?? null,
  };
}