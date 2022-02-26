import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

async function getCategory(catId: number) {
  return await prisma.category.findUnique({
    where: {
      id: catId,
    },
  });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { cid } = req.query;
  res.json(getCategory(parseInt(cid as string)))
  
}

// export default function handler(req, res) {
//     const {cid} = req.query
//     res.end(`Category: ${cid}`)
// }
