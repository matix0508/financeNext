import React, { FC } from 'react'
import styles from "./FormItem.module.scss";

export const FormItem:FC = ({children}) => {
  return (
    <div className={styles.FormItem}>{children}</div>
  )
}
