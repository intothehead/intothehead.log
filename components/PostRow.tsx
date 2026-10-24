import styles from "./PostRow.module.css";

type PostRowProps = {
  title: string;
  date: string;
  tag: string;
};

export default function PostRow({ title, date, tag }: PostRowProps) {
  return (
    <li className={styles.PostRow}>
      <time className={styles.Date}>{date}</time>
      <div className={styles.TagCell}>
        <span className={styles.Tag}>{tag}</span>
      </div>
      <h2 className={styles.Title}>{title}</h2>
    </li>
  );
}
