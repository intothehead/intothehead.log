import { posts } from "@/data/posts";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

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
    <main className={styles.Article}>
      <div className={styles.PostHeader}>
        <h1 className={styles.Title}>{post.title}</h1>
      </div>
    </main>
  );
}
