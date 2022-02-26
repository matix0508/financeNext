import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category | null>
) {
  const { cid } = req.query;

  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(cid as string),
    },
  });

  res.json(category)
  
}
