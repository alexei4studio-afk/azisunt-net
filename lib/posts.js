import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function readFileLF(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n").trim();
}

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