import { Suspense } from "react";
import { redirect } from "next/navigation";
import Tiptap from "@/components/Tiptap";
import WriteForm from "@/components/WriteForm";
import ThumbnailInput from "@/components/ThumbnailInput";
import styles from "./page.module.css";

const repoContentsUrl =
  "https://api.github.com/repos/intothehead/intothehead.log/contents";

export default function WritePage() {
  async function savePost(formData: FormData) {
    "use server";
    const password = formData.get("password");
    if (password !== process.env.WRITE_PASSWORD) {
      return { message: "비밀번호가 틀렸어요." };
    }
    const headers = { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` };

    const title = formData.get("title");
    const content = formData.get("content");
    const summary = formData.get("summary");
    const tags = String(formData.get("tags"));
    const tagList = tags.split(",");
    const tagsText = JSON.stringify(tagList);
    const id = formData.get("id");
    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id) ||
      !title.trim()
    ) {
      return { message: "id나 제목을 확인해 주세요." };
    }
    const existing = await fetch(`${repoContentsUrl}/content/${id}.mdx`, {
      headers,
      cache: "no-store",
    });
    if (existing.ok) {
      return {
        message: `이미 "${id}" id로 올린 글이 있어요. 다른 id를 써 주세요.`,
      };
    }
    const date = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Seoul",
    });
    const dotDate = date.replaceAll("-", ".");
    let thumbnailLine = "";
    const thumbnail = formData.get("thumbnail");
    if (thumbnail instanceof File && thumbnail.size > 0) {
      const thumbnailType = thumbnail.type.match(
        /^image\/(png|jpeg|gif|webp)$/,
      );
      if (!thumbnailType) {
        return { message: "썸네일은 png, jpg, gif, webp만 올릴 수 있어요." };
      }
      const extension = thumbnailType[1] === "jpeg" ? "jpg" : thumbnailType[1];
      const thumbnailPath = `images/posts/${id}/thumbnail.${extension}`;
      const thumbnailResponse = await fetch(
        `${repoContentsUrl}/public/${thumbnailPath}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            message: `썸네일 추가: ${thumbnailPath}`,
            content: Buffer.from(await thumbnail.arrayBuffer()).toString(
              "base64",
            ),
            branch: "main",
          }),
        },
      );
      if (!thumbnailResponse.ok) {
        return {
          message: `썸네일을 올리지 못했어요. (${thumbnailResponse.status})`,
        };
      }
      thumbnailLine = `\n  thumbnail: "/${thumbnailPath}",`;
    }
    let body = String(content);
    const images = [
      ...body.matchAll(/!\[([^\]]*)\]\(data:image\/(\w+);base64,([^)]+)\)/g),
    ];
    for (const [index, image] of images.entries()) {
      const [markdown, alt, type, data] = image;
      const extension = type === "jpeg" ? "jpg" : type;
      const imagePath = `images/posts/${id}/${index + 1}.${extension}`;
      const imageResponse = await fetch(
        `${repoContentsUrl}/public/${imagePath}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            message: `이미지 추가: ${imagePath}`,
            content: data,
            branch: "main",
          }),
        },
      );
      if (!imageResponse.ok) {
        return {
          message: `이미지를 올리지 못했어요. (${imageResponse.status})`,
        };
      }
      body = body.replace(markdown, () => `![${alt}](/${imagePath})`);
    }
    const mdx = `export const info = {${thumbnailLine}
  title: "${title}",
  summary: "${summary}",
  tags: ${tagsText},
  date: "${dotDate}"
};

${body}
`;
    const baseContent = Buffer.from(mdx).toString("base64");
    const response = await fetch(`${repoContentsUrl}/content/${id}.mdx`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: `글 추가: ${title}`,
        content: baseContent,
        branch: "main",
      }),
    });
    if (!response.ok) {
      return { message: `글을 올리지 못했어요. (${response.status})` };
    }
    redirect("/");
  }
  return (
    <main className={styles.Page}>
      <h1 className={styles.Heading}>관리자 새 글 쓰기</h1>
      <WriteForm action={savePost} className={styles.Form}>
        <div className={styles.Field}>
          <label htmlFor="title" className={styles.Label}>
            제목
          </label>
          <input
            id="title"
            name="title"
            required
            className={`${styles.Input} ${styles.TitleInput}`}
          />
        </div>
        <div className={styles.Field}>
          <label htmlFor="summary" className={styles.Label}>
            요약
          </label>
          <input id="summary" name="summary" className={styles.Input} />
        </div>
        <div className={styles.Row}>
          <div className={styles.Field}>
            <label htmlFor="id" className={styles.Label}>
              주소 (id)
            </label>
            <input
              id="id"
              name="id"
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              title="영어 소문자, 숫자, -만 쓸 수 있어요"
              placeholder="react-use-effect"
              className={styles.Input}
            />
          </div>
          <div className={styles.Field}>
            <label htmlFor="tags" className={styles.Label}>
              태그
            </label>
            <input
              id="tags"
              name="tags"
              placeholder="React,Next.js"
              className={styles.Input}
            />
          </div>
        </div>
        <div className={styles.Field}>
          <span className={styles.Label}>썸네일 (선택)</span>
          <ThumbnailInput />
        </div>
        <div className={styles.Field}>
          <span className={styles.Label}>본문</span>
          <Suspense>
            <Tiptap />
          </Suspense>
        </div>
        <div className={styles.Submit}>
          <div className={`${styles.Field} ${styles.PasswordField}`}>
            <label htmlFor="password" className={styles.Label}>
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={styles.Input}
            />
          </div>
          <button type="submit" className={styles.SubmitButton}>
            보내기
          </button>
        </div>
      </WriteForm>
    </main>
  );
}
