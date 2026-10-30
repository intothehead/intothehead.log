"use client";
import { motion } from "motion/react";
import styles from "./RollingText.module.css";

const letterVariants = {
  rest: { y: "0%" },
  hover: { y: "-50%" },
};

export default function RollingText({ text }: { text: string }) {
  return (
    <span className={styles.Text}>
      <span className={styles.Hidden}>{text}</span>
      {[...text].map((letter, index) => (
        <span key={index} className={styles.Letter} aria-hidden="true">
          <motion.span
            className={styles.Track}
            variants={letterVariants}
            transition={{
              duration: 0.3,
              ease: [0.65, 0, 0.35, 1],
              delay: index * 0.04,
            }}
          >
            <span>{letter}</span>
            <span>{letter}</span>
          </motion.span>
        </span>
      ))}
    </span>
  );
}
