import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  const { uid } = req.query;

  switch (req.method) {
    case "GET":
      const user = await prisma.user.findUnique({
        where: {
          id: Number(uid),
        },
      });
      res.status(200).json(user);
      break;
    case "PUT":
      const { name, email } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id: Number(uid) },
        data: {
          name: name,
          email: email,
        },
      });
      res.status(200).json(updatedUser);
      break;
    case "DELETE":
      const deletedUser = await prisma.user.delete({
        where: {
          id: Number(uid),
        },
      });

      res.status(200).json(deletedUser);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
