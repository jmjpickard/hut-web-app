import * as React from "react";
import styles from "../components/styles.module.scss";

export const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <span className={styles.title}>THE HUT</span>
    </div>
  );
};
