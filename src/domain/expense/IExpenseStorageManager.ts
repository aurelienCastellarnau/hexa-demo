import { Expense } from "@domain/expense/Expense"
import { IExpenseRepository } from "@domain/expense/IExpenseRepository";
import { IExpenseStorageMapper } from "@domain/expense/IExpenseStorageMapper"

export interface IExpenseStorageManager {
    readonly repository: IExpenseRepository;
    readonly mapper: IExpenseStorageMapper;

    add(expense: Expense): Promise<Expense[]>;
    readAll(): Promise<Expense[]>
    removeAll(): Promise<boolean>
}
