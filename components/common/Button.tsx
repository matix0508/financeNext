import React, { FC } from 'react'
import styles from '../../styles/Common.module.scss';

export const Button:FC = ({children}) => {
  return (
    <div className={styles.btn}>
        {children}
    </div>
  )
}
