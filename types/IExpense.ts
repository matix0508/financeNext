export interface IExpense {
    name: string,
    category: string | undefined,
    cost: number,
    description: string,
    merchant: string | undefined,
    date: Date
}