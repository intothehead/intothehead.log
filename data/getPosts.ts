import fs from "node:fs";
import type { Post } from "@/data/posts";

export async function getPosts() {
  const contentNames = fs.readdirSync("content");
  const posts: Post[] = [];

  for (const contentName of contentNames) {
    const id = contentName.replace(".mdx", "");
    const { info } = await import(`@/content/${id}.mdx`);
    posts.push({ id: Number(id), ...info });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}
