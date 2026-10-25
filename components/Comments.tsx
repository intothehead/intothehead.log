"use client";
import Giscus from "@giscus/react";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true });
  return () => observer.disconnect();
}

function getTheme() {
  const nowTheme = document.documentElement.getAttribute("data-theme");
  return nowTheme === "dark" ? "transparent_dark" : "light";
}

function getServerTheme() {
  return "light";
}

export default function Comments() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  return (
    <Giscus
      repo="intothehead/intothehead.log"
      repoId="R_kgDOVWdlJA"
      category="Announcements"
      categoryId="DIC_kwDOVWdlJM4DJjcY"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      lang="ko"
      loading="lazy"
      theme={theme}
    />
  );
}
