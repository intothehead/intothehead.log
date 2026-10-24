import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.NotFound}>
      <h1 className={styles.Title}>글을 찾을 수 없어요</h1>
      <p className={styles.Description}>주소가 바뀌었거나 없는 글이에요.</p>
      <Link href="/posts" className={styles.BackLink}>
        전체 글 보기 →
      </Link>
    </main>
  );
}
