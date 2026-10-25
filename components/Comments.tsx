"use client";
import Giscus from "@giscus/react";

export default function Comments() {
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
    />
  );
}
