export interface IExpenseRepository {
    add(expenseDto: string): Promise<string>
    fetchAll(): Promise<string>
    removeAll(): Promise<boolean>
}
