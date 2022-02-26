import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category>
) {
  const {name, userId} = JSON.parse(req.body)
  const result = await prisma.category.create({
    data: {
      name: name,
      user: {connect: {id: userId}}
    }

  })
  res.json(result)
  
}

// export default function handler(req, res) {
//     const {cid} = req.query
//     res.end(`Category: ${cid}`)
// }
