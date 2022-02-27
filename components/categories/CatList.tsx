import React, { FC } from "react";
import styles from "../../styles/Categories.module.scss";
import { CatListItem } from "./CatListItem";
import { AddButton } from "../common/AddButton";
import { useRouter } from "next/router";

interface ICatList {
  items: string[];
  active: string;
  setActive: (item: string) => void;
}

export const CatList: FC<ICatList> = ({ items, active, setActive }) => {
  const router = useRouter();
  return (
    <div className={styles.categories}>
      <ul className={styles.categories__list}>
        {items.map((item, i) => (
          <div key={i} onClick={() => setActive(item)}>
            <CatListItem active={item === active}>{item}</CatListItem>
          </div>
        ))}
        <AddButton onClick={() => router.push("/categories/create")}>
          Add Cateogry
        </AddButton>
      </ul>
    </div>
  );
};
