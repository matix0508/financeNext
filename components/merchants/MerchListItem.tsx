import React, { FC } from "react";
import styles from "../../styles/ItemsList.module.scss";

interface IMerchListItem {
  active: boolean;
  onClick: () => void;
}

export const MerchListItem: FC<IMerchListItem> = ({ children, active, onClick }) => {
  const activeStr = ` ${styles.itemsList__item__label_active}`;
  let styleStr = styles.itemsList__item__label;
  if (active) {
    styleStr += activeStr;
  }

  return <li onClick={onClick} className={styleStr}>{children}</li>;
};
