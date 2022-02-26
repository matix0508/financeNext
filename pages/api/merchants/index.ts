import { Merchant } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Merchant[]>
) {
  res.json(await prisma.merchant.findMany());
}
