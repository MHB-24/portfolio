import styles from './Tag.module.css';

export default function Tag({ children, small, className = '' }) {
  return (
    <span className={`${styles.tag} ${small ? styles.sm : ''} ${className}`}>
      {children}
    </span>
  );
}
