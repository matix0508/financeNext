import React, { FC } from "react";
import styles from "./ReadExpense.module.scss";
import { useRouter } from "next/router";
import { IExpense } from "../../../types/IExpense";
import { Read } from "../../common/Read/Read";

interface IReadExpense {
  expense: IExpense | undefined;
  onDelete: () => void;
}

export const ReadExpense: FC<IReadExpense> = ({ expense, onDelete }) => {
  const router = useRouter();
  if (expense === undefined) {
    return <></>;
  }
  const handleEdit = () => {
    router.push(`/expenses/${expense.id}/edit`);
  };

  return (
    <Read onDelete={onDelete} handleEdit={handleEdit} item={expense}>
      <div className={styles.ReadExpense}>
      <h3 className={styles.read__name}>{expense.name}</h3>
      <h6 className={styles.read__id}>id: {expense.id}</h6>
      <h6>{expense.cost}zł</h6>
      <h6>
        {typeof expense.merchant === "string"
          ? expense.merchant
          : expense.merchant?.name}
      </h6>

      <p>{expense.description}</p>
      </div>

    </Read>
  );
};
