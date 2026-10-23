"use client";
import { useLayoutEffect } from "react";
import Image from "next/image";
import styles from "./ThemeButton.module.css";

export default function ThemeButton() {
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);
  function themeClick() {
    const nowTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = nowTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
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
