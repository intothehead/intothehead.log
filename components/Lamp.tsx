"use client";
import { motion, useMotionValue, useTransform, useAnimate } from "motion/react";
import styles from "./Lamp.module.css";
import { toggleTheme } from "@/lib/theme";
import Image from "next/image";

export default function Lamp() {
  const [swingRef, animate] = useAnimate();
  const handleY = useMotionValue(0);
  const cordScale = useTransform(handleY, (latest) => (180 + latest) / 180);

  return (
    <div className={styles.Lamp} aria-hidden="true">
      <Image
        className={styles.LampOff}
        src="/images/lamp/lamp_off.webp"
        alt=""
        width={322}
        height={338}
        unoptimized
      />
      <Image
        className={styles.LampOn}
        src="/images/lamp/lamp_on.webp"
        alt=""
        width={322}
        height={338}
        unoptimized
      />
      <div className={styles.Pull} ref={swingRef}>
        <motion.div className={styles.PullCord} style={{ scaleY: cordScale }} />
        <motion.div
          onDragEnd={(event, info) => {
            if (info.offset.y > 50) {
              toggleTheme();
            }
            animate(
              swingRef.current,
              { rotate: [0, 10, -8, 5, -3, 0] },
              { duration: 1.2 },
            );
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
