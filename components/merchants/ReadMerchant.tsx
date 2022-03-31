import { Category, Merchant } from "@prisma/client";
import React, { FC } from "react";
import styles from "./ReadMerchant.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Read } from "../common/Read/Read";

interface IReadMerchant {
  merchant: Merchant | undefined;
}

export const ReadMerchant: FC<IReadMerchant> = ({ merchant }) => {
  const router = useRouter();
  if (merchant === undefined) {
    return <></>;
  }

  const handleEdit = () => {
    router.push(`/merchants/${merchant.id}/edit`);
  };
  return (
    <Read item={merchant} handleEdit={handleEdit}>
      <div className={styles.ReadMerchant}>
        <h3 className={styles.ReadMerchant__name}>{merchant.name}</h3>
        <h6 className={styles.ReadMerchant__id}>id: {merchant.id}</h6>
        <p className={styles.ReadMerchant__last}>Spent last month: 0zł</p>
        <p className={styles.ReadMerchant__current}>Spent this month: 0zł</p>
      </div>
    </Read>
  );
};
