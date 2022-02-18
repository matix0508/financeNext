import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import styles from "../../styles/Nav.module.scss";

function getPath(path: string) {
  if (path === "Home") return "/";
  return path.split(" ")[0].toLowerCase();
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
  let st = styles.navbar__item;
  if (isActive(router.pathname, myPath)) st += ` ${styles.navbar__item_active}`;
  return (
    <li onClick={() => router.push(myPath)} className={st}>
      {page}
    </li>
  );
};
