import { Link } from 'react-router-dom';
import styles from './AnimatedBtn.module.css';

export default function AnimatedBtn({ url, text }) {
  return (
    <Link to={url} className={styles["animated-button"]}>
      {text}
    </Link>
  );
}
