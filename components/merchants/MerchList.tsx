import React, { FC } from "react";
import styles from "../../styles/ItemsList.module.scss";
import { MerchListItem } from "./MerchListItem";
import { AddButton } from "../common/AddButton";
import { useRouter } from "next/router";
import { Merchant } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { queryClient } from "../../pages/_app";

interface IMerchList {
  items: Merchant[];
  active: Merchant | undefined;
  setActive: (item: Merchant) => void;
}

export const MerchList: FC<IMerchList> = ({
  items,
  active,
  setActive,
}) => {
  const router = useRouter();

  const handleDelete = async (merchant: Merchant) => {
    const result = await fetch(`/api/merchants/${merchant.id}`, {
      method: "DELETE",
    });
    console.log(await result.json());
    queryClient.refetchQueries("merchants")
  };

  if (!items) {
    return <></>;
  }
  return (
    <ul className={styles.itemsList}>
      {items.map((item, i) => (
        <div key={i} className={styles.itemsList__item}>
          <MerchListItem onClick={() => setActive(item)} active={item === active}>
            {item.name}
          </MerchListItem>
          <FontAwesomeIcon
            className={styles.itemsList__item__trash}
            onClick={() => handleDelete(item)}
            icon={faTrash}
          />
        </div>
      ))}
      <AddButton onClick={() => router.push("/merchants/create")}>
        Add Merchant
      </AddButton>
    </ul>
  );
};
