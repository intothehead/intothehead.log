import styles from "./PostCard.module.css";

export default function PostCard() {
  return (
    <article className={styles.PostCard}>
      <div className={styles.Thumbnail}>
        <span className={styles.Blogname}>intothehead.log</span>
      </div>
      <div className={styles.Body}>
        <div className={styles.Tags}>
          <span className={styles.Tag}>React</span>
          <span className={styles.Tag}>성능</span>
        </div>
        <h2 className={styles.Title}>
          React 렌더링 최적화 — memo와 useCallback은 언제 써야 할까
        </h2>
        <p className={styles.Summary}>
          불필요한 리렌더링이 왜 생기는지 확인하고, memo와 useCallback을 실제로
          써야 하는 상황과 아닌 상황을 구분
        </p>
        <time className={styles.Date}>2026.10.18</time>
      </div>
    </article>
  );
}
