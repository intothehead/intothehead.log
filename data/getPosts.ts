import fs from "node:fs";
import type { Post } from "@/data/posts";

const tagThumbnails: Record<string, string> = {
  javascript: "/images/topic-thumbnails/javascript.webp",
  react: "/images/topic-thumbnails/react.webp",
  "next.js": "/images/topic-thumbnails/nextjs.webp",
  html: "/images/topic-thumbnails/html.webp",
  css: "/images/topic-thumbnails/css.webp",
  browser: "/images/topic-thumbnails/browser.webp",
  network: "/images/topic-thumbnails/network.webp",
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
