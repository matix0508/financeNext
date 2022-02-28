import { Expense } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Expense[]>
) {
  const categories = await prisma.category.findMany();
  const merchants = await prisma.merchant.findMany();
  const getCategory = (catId: number) => categories.filter(category => category.id === catId).shift()
  const getMerchant = (merchId: number) => merchants.filter(merchant => merchant.id === merchId).shift()

  const data = await prisma.expense.findMany()
  const response = data.map(item => ({
    ...item,
    category: getCategory(item.categoryId),
    merchant: getMerchant(item.merchantId)
  }))
  res.json(response);
}
