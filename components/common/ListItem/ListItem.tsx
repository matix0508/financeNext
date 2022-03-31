import React, { FC, useState } from "react";
import styles from "./ItemList.module.scss";
import classNames from "classnames";

interface IListItem {
  active: boolean;
  onClick: () => void;
}

export const ListItem: FC<IListItem> = ({ children, active, onClick }) => {

  return <li onClick={onClick} className={classNames([styles.List__item__label, {active: active}])}>{children}</li>;
};
