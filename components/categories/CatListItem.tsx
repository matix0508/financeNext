import React, { FC } from 'react'
import styles from '../../styles/Categories.module.scss';

export const CatListItem:FC = ({children}) => {
  return (
    <li className={styles.categories__list__item}>
    {children}
  </li>
  )
}
