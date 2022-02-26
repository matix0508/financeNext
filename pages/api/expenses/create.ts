import { Category, Expense } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Expense>
) {
  const { name, categoryId, cost, description, merchantId, date } = JSON.parse(req.body);
  const result = await prisma.expense.create({
    data: {
      name: name,
      category: {connect: {id: categoryId}},
      cost: cost,
      description: description,
      merchant: {connect: {id: merchantId}},
      date: date
    },
  });
  res.json(result);
}

