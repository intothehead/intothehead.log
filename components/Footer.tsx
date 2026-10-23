import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.Footeroutside}>
      <div className={styles.Footerinside}>
        <p className={styles.Footertext}>© 2026 intothehead.log</p>
        <a
          className={styles.Footertext}
          href="https://github.com/intothehead"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
