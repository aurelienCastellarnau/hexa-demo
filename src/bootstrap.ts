import path from "path";
import { Express } from "express";
import { ExpenseController } from "@controller/Expense";
import { Expense } from "./router/Expense";
import { IRoute, Router } from "./router/Router";
import { IExpenseStorageMapper } from "@domain/expense/IExpenseStorageMapper";
import { IStorageConfig } from "@domain/expense/IStorageConfig";
import { IExpenseRepository } from "@domain/expense/IExpenseRepository";
import { IExpenseDependencies } from "@domain/expense/handler/IExpenseDependencies";
import { IExpenseStorageManager } from "@domain/expense/IExpenseStorageManager";
import { FileService } from "@service/file/fileService";
import { addExpenseHandler } from "@infrastructure/expense/handler/addExpenseHandler";
import { ExpenseFileStorageManager } from "@infrastructure/expense/fileStorage/ExpenseFileStorageManager";
import { ExpenseFileMapper } from "@infrastructure/expense/fileStorage/ExpenseFileMapper";
import { ExpenseFileRepository } from "@infrastructure/expense/fileStorage/ExpenseFileRepository";
import { parseBodyToExpenseHandler } from "@infrastructure/expense/handler/parseBodyToExpenseHandler";

export const bootstrap = (app: Express) => {
    const storageConfig: IStorageConfig = {
        host: path.resolve(__dirname, '../', 'data/', 'expense.json'),
    }
    const expenseFileRepository: IExpenseRepository = new ExpenseFileRepository(storageConfig, {fileService: new FileService()});
    const expenseMapper: IExpenseStorageMapper = new ExpenseFileMapper();
    const expenseFileStorageManager: IExpenseStorageManager = new ExpenseFileStorageManager(expenseMapper, expenseFileRepository);
    const expenseDependencies: IExpenseDependencies = {
        storageManager: expenseFileStorageManager,
    }
    const expenseController = new ExpenseController(
        parseBodyToExpenseHandler(),
        // middlewares
        addExpenseHandler(expenseDependencies)
    );

    const routes: IRoute[] = [
        new Expense(expenseController),
    ]

    return new Router(app, routes);
}
