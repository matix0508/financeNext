import {  Merchant } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Merchant | null>
) {
  const { mid } = req.query;

  switch (req.method) {
    case "GET":
      const merchant = await prisma.merchant.findUnique({
        where: {
          id: Number(mid),
        },
      });
      res.status(200).json(merchant);
      break;
    case "PUT":
      const { name } = req.body;
      const updatedMerchant = await prisma.merchant.update({
        where: { id: Number(mid) },
        data: {
          name: name,
        },
      });
      res.status(200).json(updatedMerchant);
      break;
    case "DELETE":
      const deletedMerchant = await prisma.merchant.delete({
        where: {
          id: Number(mid),
        },
      });

      res.status(200).json(deletedMerchant);
      break;
      default:
        res.setHeader("Allow", ['GET', 'PUT', "DELETE"])
        res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
