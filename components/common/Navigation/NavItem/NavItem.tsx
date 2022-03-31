import { useRouter } from "next/router";
import React, { FC } from "react";
import styles from "./NavItem.module.scss";
import classNames from "classnames";

function getPath(path: string) {
  if (path === "Home") return "/";
  return "/" + path.split(" ")[0].toLowerCase();
}

function isActive(current: string, path: string) {
  if (current === path) {
    return true;
  }

  if (current.split("/")[1] === path) {
    return true;
  }
  return false;
}

interface INavItem {
  page: string;
}

export const NavItem: FC<INavItem> = ({ page }) => {
  const router = useRouter();
  const myPath = getPath(page);
  return (
    <li onClick={() => router.push(myPath)} className={classNames([styles.NavItem, {active: isActive(router.pathname, myPath)}])}>
      {page}
    </li>
  );
};
