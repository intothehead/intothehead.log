import { posts } from "@/data/posts";
import { notFound } from "next/navigation";

type PostDetailProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ id: String(post.id) }));
}

export default async function PostDetail({ params }: PostDetailProps) {
  const { id } = await params;
  const post = posts.find((item) => String(item.id) === id);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <h1>{post.title}</h1>
    </main>
  );
}
