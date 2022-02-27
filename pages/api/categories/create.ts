import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category>
) {
  console.log(req)
  const { name, userId } = req.body;
  
  const result = await prisma.category.create({
    data: {
      name: name,
      user: { connect: { id: userId } },
    },
  });
  res.json(result);
}
