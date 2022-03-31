import React, { FC } from "react";
import styles from "./AddButton.module.scss";

interface IAddButton {
  onClick: ()=> void
}

export const AddButton: FC<IAddButton> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={styles.AddButton}>
      <span>{children}</span>
    </div>
  );
};
