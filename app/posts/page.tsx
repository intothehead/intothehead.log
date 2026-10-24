import PostRow from "@/components/PostRow";
import styles from "./page.module.css";
import { pickTags, posts } from "@/data/posts";

export default function AllPosts() {
  return (
    <main className={styles.PostPage}>
      <div className={styles.PostTextBox}>
        <h1 className={styles.MainTitle}>전체 글</h1>
        <p className={styles.PostCount}>총 {posts.length}개의 글</p>
      </div>
      <div className={styles.TagFilter}>
        {pickTags.map((tag) => (
          <button key={tag} type="button" className={styles.TagButton}>
            {tag}
          </button>
        ))}
      </div>
      <ul className={styles.PostList}>
        {posts.map((post) => (
          <PostRow
            key={post.id}
            title={post.title}
            date={post.date}
            tag={post.tags[0]}
          />
        ))}
      </ul>
    </main>
  );
}
