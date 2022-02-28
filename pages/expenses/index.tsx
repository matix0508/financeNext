import { Category, Expense, Merchant } from "@prisma/client";
import React, { useState } from "react";
import { Table } from "../../components/expenses/Table";
import { useFetch } from "usehooks-ts";
import { IExpense } from "../../types/IExpense";
type IExpenses = (Expense & { category?: Category; merchant?: Merchant })[];

export const Expenses = () => {
  const [expenses, setExpenses] = useState<IExpenses>([]);
  // const data: IExpense[] = [
  //   {
  //     name: "Biedra",
  //     category: "Groceries",
  //     cost: 54,
  //     description: "",
  //     merchant: "Biedronka",
  //     date: "today"
  //   },
  //   {
  //     name: "Biedra",
  //     category: "Groceries",
  //     cost: 54,
  //     description: "",
  //     merchant: "Biedronka",
  //     date: "today"
  //   },
  //   {
  //     name: "Biedra",
  //     category: "Groceries",
  //     cost: 54,
  //     description: "",
  //     merchant: "Biedronka",
  //     date: "today"
  //   },
  //   {
  //     name: "Biedra",
  //     category: "Groceries",
  //     cost: 54,
  //     description: "",
  //     merchant: "Biedronka",
  //     date: "today"
  //   },
  // ]
  const {data, error} = useFetch<IExpenses>("/api/expenses")
  if (error) return <p>There is an error</p>
  if (!data) return <p>Loading...</p>
  const newData: IExpense[] = data.map((item) => ({
    name: item.name,
    category: item.category?.name,
    cost: item.cost,
    description: item.description,
    merchant: item.merchant?.name,
    date: item.date
  }));
  return <Table rawData={newData} />;
};

export default Expenses;
