import styles from "./Lamp.module.css";

export default function Lamp() {
  return (
    <div className={styles.Lamp}>
      {/* 전등 전체 */}
      <div className={styles.Cord} /> {/* 천장에서 내려오는 줄 */}
      <div className={styles.Shade} /> {/* 전등 갓 */}
      <div className={styles.Pull}>
        {/* 손잡이 묶음 (3단계에서 끌어당길 부분) */}
        <div className={styles.PullCord} /> {/* 손잡이 줄 */}
        <div className={styles.Handle} /> {/* 손잡이 */}
      </div>
    </div>
  );
}
