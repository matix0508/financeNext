import { Category, Expense, Merchant } from "@prisma/client";
import React, { useState } from "react";
import { Table } from "../../components/expenses/Table";
import { IExpense } from "../../types/IExpense";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { ReadExpense } from "../../components/expenses/ReadExpense/ReadExpense";
import { AddButton } from "../../components/common/AddButton/AddButton";
import styles from "../../styles/Expenses.module.scss";
import { queryClient } from "../_app";

type IExpenses = (Expense & {
  category?: Category | undefined;
  merchant?: Merchant | undefined;
})[];

export const Expenses = () => {
  const handleDelete = async (expense: IExpense | undefined) => {
    if (expense === undefined) {
      return
    }
    const result = await fetch(`/api/expenses/${expense.id}`, {
      method: "DELETE",
    });
    console.log(await result.json());
    queryClient.refetchQueries("expenses");
    setCurrent(undefined)
  };
  const [current, setCurrent] = useState<IExpense>();
  const router = useRouter();
  const { isLoading, error, data } = useQuery<IExpenses, Error>(
    "expenses",
    () => fetch("/api/expenses").then((res) => res.json())
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  if (!data || data.length === 0)
    return (
      <>
        No data
        <button onClick={() => router.push("/expenses/create")}>Add</button>
      </>
    );
  const newData: any = data.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category?.name,
    cost: item.cost,
    description: item.description,
    merchant: item.merchant?.name,
    date: item.date,
    self: item,
  }));
  return (
    <div className={styles.expenses}>
      <div className={styles.expenses__table}>
      <Table rawData={newData} onClick={setCurrent} />
      <AddButton onClick={() => router.push("/expenses/create")}>Add</AddButton>
      </div>

      <div className={styles.expenses__expense}>
      <ReadExpense expense={current} onDelete={() => handleDelete(current)} />
      </div>
      
    </div>
  );
};

export default Expenses;
