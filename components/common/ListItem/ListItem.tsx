import React, { FC, useState } from "react";
import styles from "./ListItem.module.scss";
import classNames from "classnames";

interface IListItem {
  active: boolean;
  onClick: () => void;
}

export const ListItem: FC<IListItem> = ({ children, active, onClick }) => {
  const stl = active ? styles.ListItem_active : ""

  return <li onClick={onClick} className={classNames([styles.ListItem__label, stl])}>{children}</li>;
};
