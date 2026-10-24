"use client";
import { motion, useMotionValue, useTransform } from "motion/react";
import styles from "./Lamp.module.css";
import { toggleTheme } from "@/lib/theme";

export default function Lamp() {
  const handleY = useMotionValue(0);
  const cordScale = useTransform(handleY, (latest) => (110 + latest) / 110);

  return (
    <div className={styles.Lamp}>
      <div className={styles.Cord} />
      <div className={styles.Shade} />
      <div className={styles.Light} />
      <div className={styles.Pull}>
        <motion.div className={styles.PullCord} style={{ scaleY: cordScale }} />
        <motion.div
          onDragEnd={(event, info) => {
            if (info.offset.y > 50) {
              toggleTheme();
            }
          }}
          className={styles.Handle}
          style={{ y: handleY }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.5}
        />
      </div>
    </div>
  );
}
