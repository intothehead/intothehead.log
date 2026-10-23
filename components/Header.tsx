import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import ThemeButton from "@/components/ThemeButton";

export default function Header() {
  return (
    <header className={styles.Headeroutside}>
      <div className={styles.Headerinside}>
        <Link href="/" className={styles.Logo}>
          intothehead
          <span className={styles.Log}>.log</span>
        </Link>
        <div className={styles.Headerbox}>
          <nav className={styles.Nav}>
            <Link href="/posts" className={styles.Headerallposts}>
              전체글
            </Link>
            <a
              className={styles.Github}
              href="https://github.com/intothehead"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                src="/icons/github.svg"
                alt="GitHub"
                width={20}
                height={20}
              />
            </a>
          </nav>
          <ThemeButton />
        </div>
      </div>
    </header>
  );
}
