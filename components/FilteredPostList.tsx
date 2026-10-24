"use client";
import PostRow from "@/components/PostRow";
import styles from "./FilteredPostList.module.css";
import { pickTags, posts } from "@/data/posts";
import { useState } from "react";

export default function FilteredPostList() {
  const [selectedTag, setSelectedTag] = useState("전체");
  const filteredPosts =
    selectedTag === "전체"
      ? posts
      : posts.filter((post) => post.tags[0] === selectedTag);
  return (
    <>
      <div className={styles.TagFilter}>
        {pickTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`${styles.TagButton} ${selectedTag === tag ? styles.Selected : ""}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <ul className={styles.PostList}>
        {filteredPosts.map((post) => (
          <PostRow
            key={post.id}
            title={post.title}
            date={post.date}
            tag={post.tags[0]}
          />
        ))}
      </ul>
    </>
  );
}
