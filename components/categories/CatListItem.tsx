import React, { FC, useState } from "react";
import styles from "../../styles/Categories/Categories.module.scss";

interface ICatListItem {
  active: boolean;
  onClick: () => void;
}

export const CatListItem: FC<ICatListItem> = ({ children, active, onClick }) => {
  const activeStr = ` ${styles.categories__list__item__category_active}`;
  let styleStr = styles.categories__list__item__category;
  if (active) {
    styleStr += activeStr;
  }

  return <li onClick={onClick} className={styleStr}>{children}</li>;
};
