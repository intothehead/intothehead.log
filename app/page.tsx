import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.Page}>
      <div className={styles.Intro}>
        <h1 className={styles.MainTitle}>최근 글</h1>
        <p className={styles.Description}>
          프론트엔드를 공부하며 배운 것들을 기록합니다.
        </p>
      </div>
      <div className={styles.Cardgrid}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            summary={post.summary}
            date={post.date}
            tags={post.tags}
          />
        ))}
      </div>
    </main>
  );
}
