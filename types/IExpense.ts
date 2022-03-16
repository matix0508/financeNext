import { Category, Merchant } from "@prisma/client";

export interface IExpense {
    id?: number,
    name: string,
    category: string | undefined | Category,
    cost: number,
    description: string,
    merchant: string | undefined | Merchant,
    date: Date
}