import React from 'react'
import styles from "./Nav.module.scss";
import { NavItem } from '../NavItem/NavItem';

export const Nav = () => {
  return (
    <nav className={styles.Nav}>
    <ul className={styles.Nav__bar}>
      <NavItem page="Home" />
      <NavItem page="Expenses" />
      <NavItem page="Categories" />
      <NavItem page="Merchants" />
    </ul>
    <ul className={styles.Nav__logging}>
      <div className={styles.Nav__logging__btn}>Log In</div>
    </ul>
  </nav>
  )
}
