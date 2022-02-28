import { Category, Merchant } from "@prisma/client";
import React, { FC } from "react";
import styles from "../../styles/Read.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

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
    <div className={styles.read}>
      <FontAwesomeIcon
        onClick={() => handleEdit()}
        className={styles.read__edit}
        icon={faPencil}
      />
      <h3 className={styles.read__name}>{merchant.name}</h3>
      <h6 className={styles.read__id}>id: {merchant.id}</h6>
      <p className={styles.read__last}>Spent last month: 0zł</p>
      <p className={styles.read__current}>Spent this month: 0zł</p>
    </div>
  );
};

