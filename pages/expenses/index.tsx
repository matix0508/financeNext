import { Category, Expense, Merchant } from "@prisma/client";
import React, { useState } from "react";
import { Table } from "../../components/expenses/Table";
import { IExpense } from "../../types/IExpense";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
type IExpenses = (Expense & { category?: Category; merchant?: Merchant })[];

export const Expenses = () => {
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
        No data<button onClick={() => router.push("/expenses/create")}>Add</button>
      </>
    );
  const newData: IExpense[] = data.map((item) => ({
    name: item.name,
    category: item.category?.name,
    cost: item.cost,
    description: item.description,
    merchant: item.merchant?.name,
    date: item.date,
  }));
  return (
    <div>
      <Table rawData={newData} />
      <button onClick={() => router.push("/expenses/create")}>Add</button>
    </div>
  );
};

export default Expenses;
