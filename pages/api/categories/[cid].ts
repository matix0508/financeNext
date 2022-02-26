import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category | null>
) {
  const { cid } = req.query;

  switch (req.method) {
    case "GET":
      const category = await prisma.category.findUnique({
        where: {
          id: Number(cid),
        },
      });
      res.status(200).json(category);
      break;
    case "PUT":
      const { name } = req.body;
      const updatedCategory = await prisma.category.update({
        where: { id: Number(cid) },
        data: {
          name: name,
        },
      });
      res.status(200).json(updatedCategory);
      break;
    case "DELETE":
      const deletedCategory = await prisma.category.delete({
        where: {
          id: Number(cid),
        },
      });

      res.status(200).json(deletedCategory);
      break;
      default:
        res.setHeader("Allow", ['GET', 'PUT', "DELETE"])
        res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
