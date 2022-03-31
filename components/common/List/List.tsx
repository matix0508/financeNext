import React, { FC } from "react";
import styles from "./List.module.scss";
import { ListItem } from "../ListItem/ListItem";
import { AddButton } from "../AddButton/AddButton";
import { useRouter } from "next/router";
import { Category, Merchant } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { queryClient } from "../../../pages/_app";

interface IList {
  items: Category[] | Merchant[];
  active: Category | Merchant | undefined;
  setActive: ((item: Category) => void) | ((item: Merchant) => void);
  itemsName: string;
}

export const List: FC<IList> = ({ items, active, setActive, itemsName}) => {
  const router = useRouter();

  const handleDelete = async (item: Category | Merchant) => {
    const result = await fetch(`/api/${itemsName}/${item.id}`, {
      method: "DELETE",
    });
    queryClient.refetchQueries([itemsName]);
  };

  if (!items) {
    return <></>;
  }
  return (
    <ul className={styles.List}>
      {items.map((item, i) => (
        <div key={i} className={styles.itemsList__item}>
          <ListItem onClick={() => setActive(item)} active={item === active}>
            {item.name}
          </ListItem>
          <FontAwesomeIcon
            className={styles.itemsList__item__trash}
            onClick={() => handleDelete(item)}
            icon={faTrash}
          />
        </div>
      ))}
      <AddButton onClick={() => router.push(`/${itemsName}/create`)}>
        Add Cateogry
      </AddButton>
    </ul>
  );
};
