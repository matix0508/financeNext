import React, { FC } from "react";
import styles from "../../styles/Common.module.scss";

interface IAddButton {
  onClick: ()=> void
}

export const AddButton: FC<IAddButton> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={styles.add_btn}>
      <span>{children}</span>
    </div>
  );
};
