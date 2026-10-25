"use client";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import styles from "./Lamp.module.css";
import { toggleTheme } from "@/lib/theme";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Lamp() {
  const [offPlay, setOffPlay] = useState(0);
  const handleY = useMotionValue(0);
  const cordScale = useTransform(handleY, (latest) => (180 + latest) / 180);

  useEffect(() => {
    const hint = animate(handleY, [0, 10, -3, 1, 0], {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 4,
    });
    return () => hint.stop();
  }, [handleY]);

  return (
    <div className={styles.Lamp} aria-hidden="true">
      <Image
        className={styles.LampOff}
        src={
          offPlay === 0
            ? "/images/lamp/lamp_off.png"
            : `/images/lamp/lamp_off.webp?play=${offPlay}`
        }
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
      <div className={styles.Pull}>
        <motion.div className={styles.PullCord} style={{ scaleY: cordScale }} />
        <motion.div
          onDragEnd={(event, info) => {
            if (info.offset.y > 50) {
              const nextTheme = toggleTheme();
              if (nextTheme === "light") {
                setOffPlay(offPlay + 1);
              }
            }
          }}
          className={styles.Handle}
          style={{ y: handleY }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.7}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 5 }}
        />
      </div>
    </div>
  );
}
