import React, { FC, useState } from 'react'
import styles from '../../styles/Categories.module.scss';


interface ICatListItem {
    active: boolean;
}

export const CatListItem:FC<ICatListItem> = ({children, active}) => {
    const activeStr = ` ${styles.categories__list__item_active}`; 
    let styleStr = styles.categories__list__item;
    if (active) {
        styleStr += activeStr;
    }

 
    
  return (
    <li className={styleStr}>
    {children}
  </li>
  )
}
