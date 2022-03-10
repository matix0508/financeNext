export interface IExpense {
    id?: number,
    name: string,
    category: string | undefined,
    cost: number,
    description: string,
    merchant: string | undefined,
    date: Date
}