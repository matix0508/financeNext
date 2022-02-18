import React from "react";
import { CatListItem } from "../../components/categories/CatListItem";
import { Button } from "../../components/common/Button";
import styles from "../../styles/Categories.module.scss";

export const Categories = () => {
  return (
    <div className={styles.categories}>
      <ul className={styles.categories__list}>
        <CatListItem>Hi</CatListItem>
        <CatListItem>Hi</CatListItem>
        <CatListItem>Hi</CatListItem>
        <Button>Add Cateogry</Button>
      </ul>
    </div>
  );
};

export default Categories;
