import styles from "./PostRow.module.css"

type PostRowProps = {
  title: string;
  date: string;
  tag: string;
};

export default function PostRow({ title, date, tag }: PostRowProps) {
  return (
    <li className={styles.PostRow}>
      <time>{date}</time>
      <span>{tag}</span>
      <h2>{title}</h2>
    </li>
  );
}
