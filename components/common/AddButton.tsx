import React, { FC } from "react";
import styles from "../../styles/Common.module.scss";

export const AddButton: FC = ({ children }) => {
  return (
    <div className={styles.add_btn}>
      <span>{children}</span>
    </div>
  );
};
