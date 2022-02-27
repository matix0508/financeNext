import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { name, email } = req.body;
  console.log(name)
  const result = await prisma.user.create({
    data: {
      name: name,
      email: email
    },
  });
  res.json(result);
}
