import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <>
      <div className="absolute inset-0 bg-black flex justify-center items-center  z-50">
        <span className={styles.loader} />
      </div>
    </>
  );
}
