import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";
type Data = {
  name: string;
};

async function getCategories() {
  return 
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[]>
) {
  res.json(await prisma.category.findMany());
}
