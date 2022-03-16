import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[]>
) {

  const users = await prisma.user.findMany();

  const getUser = (userId: number) => users.filter(user => user.id === userId).shift()

  const data = await prisma.category.findMany();
  const response = data.map((item) => ({
    ...item,
    user: getUser(item.userId)
  }));
  res.json(response);
}
