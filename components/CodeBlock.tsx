"use client";
import { useRef, useState, type ComponentProps } from "react";
import styles from "./CodeBlock.module.css";

export default function CodeBlock(props: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const code = preRef.current?.querySelector("code")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <pre {...props} ref={preRef}>
      {props.children}
      <button type="button" className={styles.CopyButton} onClick={handleCopy}>
        {copied ? "복사됨" : "복사"}
      </button>
    </pre>
  );
}
