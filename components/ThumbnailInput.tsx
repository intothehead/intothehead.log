"use client";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import styles from "./ThumbnailInput.module.css";

export default function ThumbnailInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function changeThumbnail(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview("");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("썸네일은 2MB 이하만 올릴 수 있어요.");
      e.target.value = "";
      setPreview("");
      return;
    }
    setPreview(URL.createObjectURL(file));
  }

  function clearThumbnail() {
    if (inputRef.current) inputRef.current.value = "";
    setPreview("");
  }

  return (
    <div className={styles.Wrapper}>
      <label htmlFor="thumbnail" className={styles.Box}>
        {preview ? (
          <Image
            src={preview}
            alt="썸네일 미리보기"
            width={240}
            height={120}
            unoptimized
            className={styles.Preview}
          />
        ) : (
          <span className={styles.Placeholder}>
            이미지 고르기
            <small>2:1 비율 추천 · 2MB 이하</small>
          </span>
        )}
      </label>
      <input
        ref={inputRef}
        id="thumbnail"
        name="thumbnail"
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        className={styles.FileInput}
        onChange={changeThumbnail}
      />
      {preview && (
        <button
          type="button"
          className={styles.ClearButton}
          onClick={clearThumbnail}
        >
          지우기
        </button>
      )}
    </div>
  );
}
