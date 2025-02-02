import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className="absolute inset-0 bg-black/30 flex justify-center items-center z-[55]">
      <span className={styles.loader} />
    </div>
  );
}
