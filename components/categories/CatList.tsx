import React, { FC } from "react";
import styles from "../../styles/Categories/Categories.module.scss";
import { CatListItem } from "./CatListItem";
import { AddButton } from "../common/AddButton";
import { useRouter } from "next/router";
import { Category } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ICatList {
  items: Category[];
  active: Category | undefined;
  setActive: (item: Category) => void;
  onChange: () => void;
}

export const CatList: FC<ICatList> = ({
  items,
  active,
  setActive,
  onChange,
}) => {
  const router = useRouter();

  const handleDelete = async (category: Category) => {
    const result = await fetch(`/api/categories/${category.id}`, {
      method: "DELETE",
    });
    console.log(await result.json());
    onChange();
  };

  if (!items) {
    return <></>;
  }
  return (
    <ul className={styles.categories__list}>
      {items.map((item, i) => (
        <div key={i} className={styles.categories__list__item}>
          <CatListItem onClick={() => setActive(item)} active={item === active}>
            {item.name}
          </CatListItem>
          <FontAwesomeIcon
            className={styles.categories__list__item__trash}
            onClick={() => handleDelete(item)}
            icon={faTrash}
          />
        </div>
      ))}
      <AddButton onClick={() => router.push("/categories/create")}>
        Add Cateogry
      </AddButton>
    </ul>
  );
};
