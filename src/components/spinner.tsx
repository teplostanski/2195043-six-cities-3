import styles from './spinner.module.css';

const Spinner = () => (
  <div className={styles.container} aria-label="Loading" role="status">
    <div className={styles.spinner} />
  </div>
);

export { Spinner };
