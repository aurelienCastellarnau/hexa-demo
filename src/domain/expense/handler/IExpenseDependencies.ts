import { IExpenseStorageManager } from "@domain/expense/IExpenseStorageManager";

export interface IExpenseDependencies {
    storageManager: IExpenseStorageManager,
}
