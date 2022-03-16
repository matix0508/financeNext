import React, { FC } from "react";
import styles from "../../styles/Read.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { IExpense } from "../../types/IExpense";

interface IReadExpense {
  expense: IExpense | undefined;
}

export const ReadExpense: FC<IReadExpense> = ({ expense }) => {
  const router = useRouter();
  if (expense === undefined) {
    return <></>;
  }

  const handleEdit = () => {
    router.push(`/expenses/${expense.id}/edit`);
  };
  return (
    <div className={styles.read}>
      <FontAwesomeIcon
        onClick={() => handleEdit()}
        className={styles.read__edit}
        icon={faPencil}
      />
      <h3 className={styles.read__name}>{expense.name}</h3>
      <h6 className={styles.read__id}>id: {expense.id}</h6>
      <h6>{expense.cost}zł</h6>
      <h6>{typeof expense.merchant === "string" ? expense.merchant : expense.merchant?.name}</h6>

      <p>{expense.description}</p>
    </div>
  );
};
