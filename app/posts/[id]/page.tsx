import { getPosts } from "@/data/getPosts";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import contentStyles from "@/components/PostContent.module.css";
import Image from "next/image";
import Link from "next/link";
import Comments from "@/components/Comments";
import CodeBlock from "@/components/CodeBlock";

type PostDetailProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ id: post.id }));
}

export default async function PostDetail({ params }: PostDetailProps) {
  const { id } = await params;
  const posts = await getPosts();
  const post = posts.find((item) => item.id === id);

  if (!post) {
    notFound();
  }

  const { default: PostBody } = await import(`@/content/${id}.mdx`);

  return (
    <main className={styles.Article}>
      <div className={styles.PostHeader}>
        <div className={styles.Tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.Tag}>
              {tag}
            </span>
          ))}
        </div>
        <h1 className={styles.Title}>{post.title}</h1>
        <time className={styles.Date}>{post.date}</time>
      </div>
      {post.thumbnail ? (
        <Image
          src={post.thumbnail}
          alt=""
          width={720}
          height={360}
          sizes="(max-width: 760px) 100vw, 720px"
          quality={90}
          unoptimized={post.thumbnail.startsWith("/images/topic-thumbnails/")}
          className={styles.ThumbnailImage}
        />
      ) : (
        <div className={styles.Thumbnail}>
          <span className={styles.Blogname}>intothehead.log</span>
        </div>
      )}
      <div className={contentStyles.Content}>
        <PostBody components={{ pre: CodeBlock }} />
      </div>
      <div className={styles.PostFooter}>
        <Link href="/posts" className={styles.BackLink}>
          ← 목록으로 돌아가기
        </Link>
      </div>
      <Comments />
    </main>
  );
}
