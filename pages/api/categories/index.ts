import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";
type Data = {
  name: string;
};

async function getCategories() {
  return await prisma.category.findMany();
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(getCategories());
}
