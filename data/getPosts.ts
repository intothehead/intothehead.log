import fs from "node:fs";
import type { Post } from "@/data/posts";

const tagThumbnails: Record<string, string> = {
  javascript: "/images/thumbnails/javascript.webp",
  react: "/images/thumbnails/react.webp",
  "next.js": "/images/thumbnails/nextjs.webp",
  html: "/images/thumbnails/html.webp",
  css: "/images/thumbnails/css.webp",
  browser: "/images/thumbnails/browser.webp",
};

function getTagThumbnail(tags: string[]) {
  for (const tag of tags) {
    const thumbnail = tagThumbnails[tag.trim().toLowerCase()];
    if (thumbnail) return thumbnail;
  }
  return undefined;
}

export async function getPosts() {
  const contentNames = fs.readdirSync("content");
  const posts: Post[] = [];

  for (const contentName of contentNames) {
    const id = contentName.replace(".mdx", "");
    const { info } = await import(`@/content/${id}.mdx`);
    posts.push({
      id: id,
      ...info,
      thumbnail: info.thumbnail ?? getTagThumbnail(info.tags),
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}
