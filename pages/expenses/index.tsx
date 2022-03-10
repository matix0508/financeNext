import { Category, Expense, Merchant } from "@prisma/client";
import React, { useState } from "react";
import { Table } from "../../components/expenses/Table";
import { IExpense } from "../../types/IExpense";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { ReadExpense } from "../../components/expenses/ReadExpense";
type IExpenses = (Expense & {
  category?: Category | undefined;
  merchant?: Merchant | undefined;
})[];

export const Expenses = () => {
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
    <div>
      <Table rawData={newData} onClick={setCurrent} />
      <button onClick={() => router.push("/expenses/create")}>Add</button>
      <ReadExpense expense={current} />
    </div>
  );
};

export default Expenses;
