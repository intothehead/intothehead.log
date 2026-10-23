import styles from "./PostCard.module.css";

type PostCardProps = {
  title: string;
  summary: string;
  date: string;
};

export default function PostCard({ title, summary, date }: PostCardProps) {
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
        <h2 className={styles.Title}>{title}</h2>
        <p className={styles.Summary}>{summary}</p>
        <time className={styles.Date}>{date}</time>
      </div>
    </article>
  );
}
