import { Expense } from "@domain/expense/Expense";

export interface IExpenseStorageMapper {
    format(expense: Expense): string;
    parseAll(expensesDto: string): Expense[];
}
