import React, { FC } from "react";
import styles from "../../styles/Categories.module.scss";
import { CatListItem } from "./CatListItem";
import { AddButton } from "../common/AddButton";
import { useRouter } from "next/router";
import { Category } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

interface ICatList {
  items: Category[];
  active: string;
  setActive: (item: string) => void;
  onChange: () => void;
}

export const CatList: FC<ICatList> = ({ items, active, setActive, onChange }) => {
  const router = useRouter();

  const handleDelete = async (category: Category) => {
    const result = await fetch(`/api/categories/${category.id}`, {
      method: "DELETE"
    })
    console.log(await result.json())
    onChange();

  }

  if (!items) {
    return <></>;
  }
  return (
    <div className={styles.categories}>
      <ul className={styles.categories__list}>
        {items.map((item, i) => (
          <div key={i} className={styles.categories__list__item}>
            <CatListItem onClick={() => setActive(item.name)} active={item.name === active}>{item.name}</CatListItem>
            <FontAwesomeIcon className={styles.categories__list__item__trash} onClick={() => handleDelete(item)} icon={faTrash} />
          </div>
        ))}
        <AddButton onClick={() => router.push("/categories/create")}>
          Add Cateogry
        </AddButton>
      </ul>
    </div>
  );
};
