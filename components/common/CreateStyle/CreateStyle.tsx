import React, { FC } from 'react'
import styles from "./CreateStyle.module.scss";

export const CreateStyle:FC = ({children}) => {
  return (
    <div className={styles.CreateStyle}>{children}</div>
  )
}
