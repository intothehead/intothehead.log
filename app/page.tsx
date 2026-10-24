import PostCard from "@/components/PostCard";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/data/getPosts";
import Lamp from "@/components/Lamp";

export default async function Home() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 6);
  return (
    <main className={styles.Page}>
      <Lamp />
      <div className={styles.Top}>
        <div className={styles.Intro}>
          <h1 className={styles.MainTitle}>최근 글</h1>
          <p className={styles.Description}>
            프론트엔드를 공부하며 배운 것들을 기록합니다.
          </p>
        </div>
        <Image
          className={`${styles.gif} ${styles.Day}`}
          src="/images/day.gif"
          alt=""
          width={226}
          height={212}
          unoptimized
        />
        <Image
          className={`${styles.gif} ${styles.Night}`}
          src="/images/night.gif"
          alt=""
          width={226}
          height={212}
          unoptimized
        />
      </div>
      <div className={styles.Cardgrid}>
        {recentPosts.map((post) => (
          <PostCard
            thumbnail={post.thumbnail}
            key={post.id}
            id={post.id}
            title={post.title}
            summary={post.summary}
            date={post.date}
            tags={post.tags}
          />
        ))}
      </div>
      <Link href="/posts" className={styles.AllPosts}>
        전체 글 보기 →
      </Link>
    </main>
  );
}
