import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../prisma/db";

interface summary {
  sum: number;
  id: number;
  name: string;
  userId: number;
}

interface SummaryResponse {
  categories: summary[];
  merchants: summary[];
  totalExpenses: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SummaryResponse>
) {
  const { month, year } = req.query;
  const startDate = new Date(Number(year), Number(month) - 1, 1);
  let total = 0;

  const endDate =
    Number(month) != 12
      ? new Date(Number(year), Number(month), 1)
      : new Date(Number(year) + 1, 0, 1);
  const expenses = await prisma.expense.findMany({
    where: {
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
  const categories = await prisma.category.findMany();
  const merchant = await prisma.merchant.findMany();
  const categoriesCount = categories.map((cat) => ({ ...cat, sum: 0 }));
  const merchantCount = merchant.map((merch) => ({ ...merch, sum: 0 }));
  expenses.forEach((item) => {
    categoriesCount[item.categoryId].sum += item.cost;
    merchantCount[item.merchantId].sum += item.cost;
    total += item.cost;
  });

  res.json({
    categories: categoriesCount,
    merchants: merchantCount,
    totalExpenses: total,
  });
}
