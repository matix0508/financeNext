import React from 'react'
import { Table } from '../../components/expenses/Table'
import { IExpense } from '../../types/IExpense'

export const Expenses = () => {
  const data: IExpense[] = [
    {
      name: "Biedra",
      category: "Groceries",
      cost: 54,
      description: "",
      merchant: "Biedronka",
      date: "today"
    },
    {
      name: "Biedra",
      category: "Groceries",
      cost: 54,
      description: "",
      merchant: "Biedronka",
      date: "today"
    },
    {
      name: "Biedra",
      category: "Groceries",
      cost: 54,
      description: "",
      merchant: "Biedronka",
      date: "today"
    },
    {
      name: "Biedra",
      category: "Groceries",
      cost: 54,
      description: "",
      merchant: "Biedronka",
      date: "today"
    },
  ]
  return (
    <Table rawData={data} />
  )
}


export default Expenses;