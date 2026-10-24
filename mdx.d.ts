declare module "*.mdx" {
  import type { PostInfo } from "@/data/posts";
  export const info: PostInfo;
}
