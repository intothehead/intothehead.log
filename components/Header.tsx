import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.Headeroutside}>
      <div className={styles.Headerinside}>
        <Link href="/" className={styles.Logo}>
          intothehead
          <span className={styles.Log}>.log</span>
        </Link>
        <nav>
          <Link href="/posts" className={styles.Headerallposts}>
            전체글
          </Link>
        </nav>
      </div>
    </header>
  );
}
