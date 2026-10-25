"use client";
import PostRow from "@/components/PostRow";
import styles from "./FilteredPostList.module.css";
import type { Post } from "@/data/posts";
import { useState } from "react";

type FilteredPostListProps = { posts: Post[] };
const postsPerPage = 8;

export default function FilteredPostList({ posts }: FilteredPostListProps) {
  const firstTags = posts.map((post) => post.tags[0]);
  const pickSet = new Set(firstTags);
  const pickTags = ["전체", ...pickSet];
  const [selectedTag, setSelectedTag] = useState("전체");
  const [page, setPage] = useState(1);
  const filteredPosts =
    selectedTag === "전체"
      ? posts
      : posts.filter((post) => post.tags[0] === selectedTag);
  const start = (page - 1) * postsPerPage;
  const end = page * postsPerPage;
  const pagePosts = filteredPosts.slice(start, end);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

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
        {pagePosts.map((post) => (
          <PostRow
            key={post.id}
            id={post.id}
            title={post.title}
            date={post.date}
            tag={post.tags[0]}
          />
        ))}
      </ul>
      <div className={styles.Pagination}>
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          ‹
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          ›
        </button>
      </div>
    </>
  );
}
