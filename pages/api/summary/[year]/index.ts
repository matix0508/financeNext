import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { year } = req.query;
  const startDate = new Date(Number(year), 0, 1);
  let total = 0;
  const today = new Date();
  const finishedMonths =
    Number(year) !== today.getFullYear() ? 12 : today.getMonth();

  const endDate = new Date(Number(year) + 1, 0, 1);
  const expenses = await prisma.expense.findMany({
    where: {
      date: {
        lt: endDate,
        gte: startDate,
        
      },
    },
  });

  const categories = await prisma.category.findMany();
  const merchant = await prisma.merchant.findMany();
  const catIds = categories.map((item) => item.id);
  const merchIds = merchant.map((item) => item.id);

  let categoriesCount = categories.map((cat) => {
    return { ...cat, average: 0 };
  });
  let merchantCount = merchant.map((merch) => {
    return { ...merch, average: 0 };
  });
  expenses.forEach((item) => {
    categoriesCount[catIds.findIndex((i) => i === item.categoryId)].average +=
      item.cost;
    merchantCount[merchIds.findIndex((i) => i === item.merchantId)].average +=
      item.cost;
    total += item.cost;
  });
  categoriesCount = categoriesCount.map((item) => {
    item.average = finishedMonths === 0 ? 0 : item.average / finishedMonths;
    return item;
  });
  merchantCount = merchantCount.map((item) => {
    item.average = finishedMonths === 0 ? 0 : item.average / finishedMonths;
    return item;
  });

  res.json({
    categories: categoriesCount,
    merchants: merchantCount,
    totalExpenses: total,
    averageExpenses: finishedMonths === 0 ? 0 : total / finishedMonths,
    months: finishedMonths
  });
}
