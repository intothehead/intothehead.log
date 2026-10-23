"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./ThemeButton.module.css";

export default function ThemeButton() {
  const [theme, setTheme] = useState("light");
  function themeClick() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }
  return (
    <button
      type="button"
      aria-label="테마 변경"
      onClick={themeClick}
      className={styles.Moon}
    >
      <Image src="/icons/moon.svg" alt="" width={18} height={18} />
    </button>
  );
}
