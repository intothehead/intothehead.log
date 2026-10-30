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
    const mdx = `export const info = {
  title: "${title}",
  summary: "${summary}",
  tags: ${tagsText},
  date: "${dotDate}"
};

${content}
`;
    const baseContent = Buffer.from(mdx).toString("base64");
    const url = `https://api.github.com/repos/intothehead/intothehead.log/contents/content/${id}.mdx`;
    console.log(url);
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
    console.log(mdx);
  }
  return (
    <form action={savePost}>
      <label htmlFor="id">id</label>
      <input id="id" name="id" />
      <label htmlFor="title">title</label>
      <input id="title" name="title" />
      <label htmlFor="summary">summary</label>
      <input id="summary" name="summary" />
      <label htmlFor="tags">tags</label>
      <input id="tags" name="tags" />
      <label htmlFor="content">content</label>
      <textarea id="content" name="content" />
      <input type="password" name="password"></input>
      <label htmlFor="password">password</label>
      <button type="submit">보내기</button>
    </form>
  );
}
