import { Link } from "react-router-dom";
import styles from "./ClassicOrange.module.css";

export default function ClassicOrange({ url, text }) {
  return (
    <Link to={url} className={styles["classic"]}>
      {text}
    </Link>
  );
}
