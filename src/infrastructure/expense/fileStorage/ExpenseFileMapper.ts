import { Expense } from "@domain/expense/Expense";
import { IExpenseStorageMapper } from "@domain/expense/IExpenseStorageMapper";

export class ExpenseFileMapper implements IExpenseStorageMapper {
    format = (expense: Expense): string => {
        return JSON.stringify(expense);
    }

    parseAll = (expensesDto: string): Expense[] => {
        try {
            return JSON.parse(expensesDto);
        } catch (err) {
            throw err;
        }
    }
}
