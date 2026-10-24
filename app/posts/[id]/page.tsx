import { posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ id: String(post.id) }));
}

export default function PostDetail() {
  return (
    <main>
      <h1>글 상세</h1>
    </main>
  );
}
