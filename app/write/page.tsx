import { Suspense } from "react";
import Tiptap from "@/components/Tiptap";
import styles from "./page.module.css";

export default function WritePage() {
  async function savePost(formData: FormData) {
    "use server";
    const password = formData.get("password");
    if (password !== process.env.WRITE_PASSWORD) {
      console.log("비밀번호가 틀렸어요");
      return;
    }

    const title = formData.get("title");
    const content = formData.get("content");
    const summary = formData.get("summary");
    const tags = String(formData.get("tags"));
    const tagList = tags.split(",");
    const tagsText = JSON.stringify(tagList);
    const id = formData.get("id");
    const date = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Seoul",
    });
    const dotDate = date.replaceAll("-", ".");
    let body = String(content);
    const images = [
      ...body.matchAll(/!\[([^\]]*)\]\(data:image\/(\w+);base64,([^)]+)\)/g),
    ];
    for (const [index, image] of images.entries()) {
      const [markdown, alt, type, data] = image;
      const extension = type === "jpeg" ? "jpg" : type;
      const imagePath = `images/posts/${id}/${index + 1}.${extension}`;
      const imageResponse = await fetch(
        `https://api.github.com/repos/intothehead/intothehead.log/contents/public/${imagePath}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
          body: JSON.stringify({
            message: `이미지 추가: ${imagePath}`,
            content: data,
            branch: "main",
          }),
        },
      );
      console.log(imageResponse.status);
      body = body.replace(markdown, () => `![${alt}](/${imagePath})`);
    }
    const mdx = `export const info = {
  title: "${title}",
  summary: "${summary}",
  tags: ${tagsText},
  date: "${dotDate}"
};

${body}
`;
    const baseContent = Buffer.from(mdx).toString("base64");
    const url = `https://api.github.com/repos/intothehead/intothehead.log/contents/content/${id}.mdx`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
      body: JSON.stringify({
        message: `글 추가: ${title}`,
        content: baseContent,
        branch: "main",
      }),
    });
    console.log(response.status);
  }
  return (
    <main className={styles.Page}>
      <h1 className={styles.Heading}>관리자 새 글 쓰기</h1>
      <form action={savePost} className={styles.Form}>
        <div className={styles.Field}>
          <label htmlFor="title" className={styles.Label}>
            제목
          </label>
          <input
            id="title"
            name="title"
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
      </form>
    </main>
  );
}
