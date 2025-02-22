import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <>
      <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
        <span className={styles.loader} />
      </div>
    </>
  );
}
