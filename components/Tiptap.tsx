"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useRef, useState, type ChangeEvent } from "react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import Highlight from "@tiptap/extension-highlight";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import styles from "./Tiptap.module.css";
import contentStyles from "./PostContent.module.css";

const MdxHighlight = Highlight.extend({
  renderMarkdown(node, helpers) {
    return `<mark>${helpers.renderChildren(node)}</mark>`;
  },
});

const AlignedParagraph = Paragraph.extend({
  renderMarkdown(node, helpers, context) {
    const markdown = this.parent?.(node, helpers, context) ?? "";
    const align = node.attrs?.textAlign;
    if (!align || !markdown) return markdown;
    return `<p data-align="${align}">${markdown}</p>`;
  },
});

const AlignedHeading = Heading.extend({
  renderMarkdown(node, helpers, context) {
    const markdown = this.parent?.(node, helpers, context) ?? "";
    const align = node.attrs?.textAlign;
    if (!align || !markdown) return markdown;
    const level = node.attrs?.level ?? 1;
    const text = markdown.replace(/^#+ /, "");
    return `<h${level} data-align="${align}">${text}</h${level}>`;
  },
});

const Tiptap = () => {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("tsx");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ paragraph: false, heading: false }),
      AlignedParagraph,
      AlignedHeading,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Markdown,
      MdxHighlight,
      TableKit,
      Image.configure({ allowBase64: true }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: `${contentStyles.Content} ${styles.Body}`,
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getMarkdown());
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });
  if (!editor) {
    return null;
  }

  function changeTextSize(e: ChangeEvent<HTMLSelectElement>) {
    if (!editor) return;
    const size = e.target.value;
    if (size === "2" || size === "3") {
      editor
        .chain()
        .focus()
        .setHeading({ level: size === "2" ? 2 : 3 })
        .run();
    } else {
      editor.chain().focus().setParagraph().run();
    }
  }

  function addImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("이미지는 2MB 이하만 올릴 수 있어요.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[[\]{}<>]/g, "");
      editor
        .chain()
        .focus()
        .setImage({ src: String(reader.result), alt })
        .run();
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.Editor}>
      <div className={styles.Toolbar}>
        <select
          className={styles.LanguageSelect}
          value=""
          onChange={changeTextSize}
          aria-label="글자 크기"
        >
          <option value="" disabled>
            글자 크기
          </option>
          <option value="p">본문</option>
          <option value="2">소제목</option>
          <option value="3">작은 제목</option>
        </select>
        <span className={styles.Divider} />
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().unsetTextAlign().run()}
        >
          왼쪽
        </button>
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          가운데
        </button>
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          오른쪽
        </button>
        <span className={styles.Divider} />
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          밑줄
        </button>
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          하이라이터
        </button>
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          {"</>"}
        </button>
        <span className={styles.Divider} />
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          인용
        </button>
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          -
        </button>
        <span className={styles.Divider} />
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() =>
            editor.chain().focus().toggleCodeBlock({ language: language }).run()
          }
        >
          코드 블록
        </button>
        <select
          className={styles.LanguageSelect}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="js">JS</option>
          <option value="ts">TS</option>
          <option value="css">CSS</option>
          <option value="tsx">TSX</option>
          <option value="txt">TXT</option>
          <option value="html">HTML</option>
          <option value="sql">SQL</option>
          <option value="csharp">CSHARP</option>
        </select>
        <span className={styles.Divider} />
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          표
        </button>
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          행 추가
        </button>
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          열 추가
        </button>
        <span className={styles.Divider} />
        <button
          type="button"
          className={styles.ToolbarButton}
          onClick={() => imageInputRef.current?.click()}
        >
          이미지
        </button>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          hidden
          onChange={addImage}
        />
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" name="content" value={content} />
    </div>
  );
};

export default Tiptap;
