import { Expense } from "@domain/expense/Expense";
import { IExpenseStorageManager } from "@domain/expense/IExpenseStorageManager";
import { IExpenseStorageMapper } from "@domain/expense/IExpenseStorageMapper";
import { IExpenseRepository } from "@domain/expense/IExpenseRepository";

export class ExpenseFileStorageManager implements IExpenseStorageManager {
    constructor(public mapper: IExpenseStorageMapper, public repository: IExpenseRepository) {};

    public add = (expense: Expense): Promise<Expense[]> => {
        const expenseDto = this.mapper.format(expense);

        return this.repository.add(expenseDto)
            .then((expenseDto) => {
                return this.mapper.parseAll(expenseDto)
            })
            .catch(err => {
                throw err
            });
    };

    public readAll(): Promise<Expense[]> {
        return this.repository.fetchAll()
            .then((fileContent) => {
                try {
                    return this.mapper.parseAll(fileContent);
                } catch (err) {
                    throw err
                }
            })
            .catch(err => {
                throw err
            });
    }

    public removeAll(): Promise<boolean> {
        return this.repository.removeAll()
            .then(res => res)
            .catch(err => {
                throw err
            });
    }
}
