// app/blog/page.js
import { getSortedPostsData } from "../../lib/posts";
import BlogContent from "./BlogContent";

export const metadata = {
  title: "Knowledge Hub | CapeSystem Authority Engine",
  description: "Studii de caz, tactici SEO/GEO/AEO și sisteme AI.",
};

export default function BlogPage() {
  const allPosts = getSortedPostsData();

  return (
    <BlogContent initialArticles={allPosts} />
  );
}