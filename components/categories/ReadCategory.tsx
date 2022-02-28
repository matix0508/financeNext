import { Category } from '@prisma/client'
import React, { FC } from 'react'
import styles from "../../styles/Categories/Read.module.scss";

interface IReadCategory {
    category: Category | undefined
}

export const ReadCategory:FC<IReadCategory> = ({category}) => {
    if (category === undefined) {
        return <></>
    }
  return (
      <div className={styles.category}>
          <h3 className={styles.category__name}>{category.name}</h3>
          <h6 className={styles.category__id}>id: {category.id}</h6>
          <p className={styles.category__last}>Spent last month: 0zł</p>
          <p className={styles.category__current}>Spent this month: 0zł</p>

      </div>

  )
}
