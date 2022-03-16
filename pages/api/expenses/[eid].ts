import { Expense } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { queryClient } from "../../_app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Expense | null>
) {
  const { eid } = req.query;


  switch (req.method) {
    case "GET":
      const expense = await prisma.expense.findUnique({
        where: {
          id: Number(eid),
        },
      });
      res.status(200).json(expense);
      break;
    case "PUT":
      const { name, categoryId, cost, description, merchantId, date } = req.body;
      const updatedExpense = await prisma.expense.update({
        where: { id: Number(eid) },
        data: {
          name: name,
          category: {connect: {id: categoryId}},
          cost: cost,
          description: description,
          merchant: {connect: {id: merchantId}},
          date: date
        },
      });
      res.status(200).json(updatedExpense);
      break;
    case "DELETE":
      const deletedExpense = await prisma.expense.delete({
        where: {
          id: Number(eid),
        },
      });

      res.status(200).json(deletedExpense);
      break;
      default:
        res.setHeader("Allow", ['GET', 'PUT', "DELETE"])
        res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
