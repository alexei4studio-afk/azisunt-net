import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// ✅ FIX: path.join(process.cwd(), "content/blog") e corect,
// dar adăugăm logging detaliat ca să poți depana pe Vercel din logs
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export function getSortedPostsData() {
  try {
    // ✅ FIX: Log calea exactă — o vei vedea în Vercel Function Logs
    console.log("[posts] POSTS_DIR =", POSTS_DIR);

    if (!fs.existsSync(POSTS_DIR)) {
      console.error("[posts] ❌ Folderul NU există:", POSTS_DIR);
      // ✅ FIX: Afișează ce există în cwd() ca să identifici problema
      console.log("[posts] Conținut cwd():", fs.readdirSync(process.cwd()));
      return [];
    }

    const allFiles = fs.readdirSync(POSTS_DIR);
    console.log("[posts] Fișiere găsite:", allFiles);

    const fileNames = allFiles.filter((f) => f.endsWith(".md"));

    if (fileNames.length === 0) {
      console.warn("[posts] ⚠️ Nu s-au găsit fișiere .md în", POSTS_DIR);
      return [];
    }

    return fileNames
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const filePath = path.join(POSTS_DIR, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");

        // ✅ FIX: Extragem data + content separat, cu valori default sigure
        const { data } = matter(fileContents);

        // Validare minimă — un articol fără title e problematic
        if (!data.title) {
          console.warn(`[posts] ⚠️ Articolul "${slug}" nu are 'title' în frontmatter`);
        }

        return {
          slug,
          title: data.title || slug,
          date: data.date || "1970-01-01",
          category: data.category || "",
          tag: data.tag || "",
          featured: data.featured || false,
          excerpt: data.excerpt || "",
          readTime: data.readTime || "5 min",
          stats: data.stats || null,
        };
      })
      // ✅ FIX: Sortare sigură — new Date() pe string invalid returnează NaN
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (isNaN(dateA.getTime())) return 1;
        if (isNaN(dateB.getTime())) return -1;
        return dateB - dateA;
      });
  } catch (err) {
    console.error("[posts] ❌ Eroare la citirea postărilor:", err);
    return [];
  }
}

export async function getPostData(slug) {
  // ✅ FIX: Sanitizăm slug-ul să nu permită path traversal
  const safeSlug = path.basename(slug);
  const fullPath = path.join(POSTS_DIR, `${safeSlug}.md`);

  console.log("[posts] getPostData pentru slug:", safeSlug);

  if (!fs.existsSync(fullPath)) {
    console.error("[posts] ❌ Fișierul nu există:", fullPath);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // ✅ FIX: remark-html cu sanitize: false permite HTML inline în Markdown
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);

    return {
      slug: safeSlug,
      contentHtml: processedContent.toString(),
      title: data.title || safeSlug,
      date: data.date || "",
      category: data.category || "",
      tag: data.tag || "",
      featured: data.featured || false,
      excerpt: data.excerpt || "",
      readTime: data.readTime || "5 min",
      stats: data.stats || null,
    };
  } catch (err) {
    console.error("[posts] ❌ Eroare la procesarea articolului:", slug, err);
    return null;
  }
}