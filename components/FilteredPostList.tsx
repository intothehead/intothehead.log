"use client";
import PostRow from "@/components/PostRow";
import styles from "./FilteredPostList.module.css";
import { pickTags, posts } from "@/data/posts";

export default function FilteredPostList() {
  return (
    <>
      <div className={styles.TagFilter}>
        {pickTags.map((tag) => (
          <button key={tag} type="button" className={styles.TagButton}>
            {tag}
          </button>
        ))}
      </div>
      <ul className={styles.PostList}>
        {posts.map((post) => (
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
