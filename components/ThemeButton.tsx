"use client";

import Image from "next/image";
import styles from "./ThemeButton.module.css";

export default function ThemeButton() {
  return (
    <button type="button" aria-label="테마 변경" className={styles.Moon}>
      <Image src="/icons/moon.svg" alt="" width={18} height={18} />
    </button>
  );
}
