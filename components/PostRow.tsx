import styles from "./PostRow.module.css";
import Link from "next/link";

type PostRowProps = {
  id: number;
  title: string;
  date: string;
  tag: string;
};

export default function PostRow({ id, title, date, tag }: PostRowProps) {
  return (
    <li>
      <Link href={`/posts/${id}`} className={styles.PostRow}>
        <time className={styles.Date}>{date}</time>
        <div className={styles.TagCell}>
          <span className={styles.Tag}>{tag}</span>
        </div>
        <h2 className={styles.Title}>{title}</h2>
      </Link>
    </li>
  );
}
