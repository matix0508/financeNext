import { Category } from "@prisma/client";
import React, { FC } from "react";
import styles from "../../styles/Categories/Read.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

interface IReadCategory {
  category: Category | undefined;
}

export const ReadCategory: FC<IReadCategory> = ({ category }) => {
  const router = useRouter();
  if (category === undefined) {
    return <></>;
  }

  const handleEdit = () => {
    router.push(`/categories/${category.id}/edit`);
  };
  return (
    <div className={styles.category}>
      <FontAwesomeIcon
        onClick={() => handleEdit()}
        className={styles.category__edit}
        icon={faPencil}
      />
      <h3 className={styles.category__name}>{category.name}</h3>
      <h6 className={styles.category__id}>id: {category.id}</h6>
      <p className={styles.category__last}>Spent last month: 0zł</p>
      <p className={styles.category__current}>Spent this month: 0zł</p>
    </div>
  );
};

