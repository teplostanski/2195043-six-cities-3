import styles from './spinner.module.css';

type SpinnerProps = {
  compact?: boolean;
};

const Spinner = ({ compact = false }: SpinnerProps) => (
  <div
    className={compact ? styles.compactContainer : styles.container}
    aria-label="Loading"
    role="status"
  >
    <div className={compact ? styles.compactSpinner : styles.spinner} />
  </div>
);

export { Spinner };
