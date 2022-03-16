import { Merchant } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { queryClient } from "../../_app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Merchant>
) {
  const { name, userId } = req.body;
  const result = await prisma.merchant.create({
    data: {
      name: name,
      user: {connect: {id: userId}}
    },
  });
  queryClient.refetchQueries("expenses")
  res.json(result);
}
