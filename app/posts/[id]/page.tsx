import { posts } from "@/data/posts";

type PostDetailProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ id: String(post.id) }));
}

export default async function PostDetail({ params }: PostDetailProps) {
  const { id } = await params;
  return (
    <main>
      <h1>{id}번 글</h1>
    </main>
  );
}
