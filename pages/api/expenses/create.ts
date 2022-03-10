import { Category, Expense } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { queryClient } from "../../_app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Expense>
) {
  const { name, categoryId, cost, description, merchantId, date } = req.body;
  const result = await prisma.expense.create({
    data: {
      name: name,
      category: { connect: { id: Number(categoryId) } },
      cost: Number(cost),
      description: description,
      merchant: { connect: { id: Number(merchantId) } },
      date: new Date(date),
    },
  });
  res.json(result);
  queryClient.refetchQueries("expenses");
}
