import styles from "./Css.module.css";

export const ExternalCSS = ({ children, type = "success" }) => {
  return <div className={`${styles.alert} ${styles[type]}`}>{children}</div>;
};
