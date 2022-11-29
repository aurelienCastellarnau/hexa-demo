import { Expense } from "../Model/Expense";

export class ExpenseParserService {
    public parse = (data: any) => {
        return data as Expense;
    }
}
