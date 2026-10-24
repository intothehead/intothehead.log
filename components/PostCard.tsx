import styles from "./PostCard.module.css";
import Link from "next/link";

type PostCardProps = {
  id: number;
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

export default function PostCard({
  id,
  title,
  summary,
  date,
  tags,
}: PostCardProps) {
  return (
    <Link href={`/posts/${id}`} className={styles.PostCard}>
      <article>
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
    </Link>
  );
}
