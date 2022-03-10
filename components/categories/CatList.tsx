import React, { FC } from "react";
import styles from "../../styles/ItemsList.module.scss";
import { CatListItem } from "./CatListItem";
import { AddButton } from "../common/AddButton";
import { useRouter } from "next/router";
import { Category } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { QueryClient, useMutation } from "react-query";
import { queryClient } from "../../pages/_app";

interface ICatList {
  items: Category[];
  active: Category | undefined;
  setActive: (item: Category) => void;
}

export const CatList: FC<ICatList> = ({
  items,
  active,
  setActive
}) => {
  const router = useRouter();

  const handleDelete = async (category: Category) => {
    const result = await fetch(`/api/categories/${category.id}`, {
      method: "DELETE",
    });
    queryClient.refetchQueries(["categories"])

  };

  if (!items) {
    return <></>;
  }
  return (
    <ul className={styles.itemsList}>
      {items.map((item, i) => (
        <div key={i} className={styles.itemsList__item}>
          <CatListItem onClick={() => setActive(item)} active={item === active}>
            {item.name}
          </CatListItem>
          <FontAwesomeIcon
            className={styles.itemsList__item__trash}
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
