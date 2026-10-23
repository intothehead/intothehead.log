import styles from "./PostCard.module.css";

type PostCardProps = {
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

export default function PostCard({
  title,
  summary,
  date,
  tags,
}: PostCardProps) {
  return (
    <article className={styles.PostCard}>
      <div className={styles.Thumbnail}>
        <span className={styles.Blogname}>intothehead.log</span>
      </div>
      <div className={styles.Body}>
        <div className={styles.Tags}>
          {tags.map((tag) => (
            <span className={styles.Tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <h2 className={styles.Title}>{title}</h2>
        <p className={styles.Summary}>{summary}</p>
        <time className={styles.Date}>{date}</time>
      </div>
    </article>
  );
}
