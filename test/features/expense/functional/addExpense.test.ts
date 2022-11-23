import { Expense } from "@domain/expense/Expense";
import { parseBodyToExpenseHandler } from "@infrastructure/expense/handler/parseBodyToExpenseHandler";
import { addExpenseHandler } from "@infrastructure/expense/handler/addExpenseHandler";
import { ExpenseController } from "@controller/Expense";
import { Request, Response, NextFunction } from "express";
import { IExpenseDependencies } from "@domain/expense/handler/IExpenseDependencies";
import { ExpenseFileRepository } from "@infrastructure/expense/fileStorage/ExpenseFileRepository";
import { ExpenseFileStorageManager } from "@infrastructure/expense/fileStorage/ExpenseFileStorageManager";
import { IExpenseStorageMapper } from "@domain/expense/IExpenseStorageMapper";
import { ExpenseFileMapper } from "@infrastructure/expense/fileStorage/ExpenseFileMapper";
import { IExpenseRepository } from "@domain/expense/IExpenseRepository";
import { IStorageConfig } from "@domain/expense/IStorageConfig";
import { FileService } from "@service/file/fileService";
import path from "path";
import { expense } from '../../../fixtures/expense';

const storageConfig: IStorageConfig = {
    host: path.resolve(__dirname, 'addExpense.json'),
}
const mapper: IExpenseStorageMapper = new ExpenseFileMapper();
const repository: IExpenseRepository = new ExpenseFileRepository(storageConfig, {fileService: new FileService()});
const dependencies: IExpenseDependencies = {
    storageManager: new ExpenseFileStorageManager(mapper, repository),
}
const expenseController = new ExpenseController(parseBodyToExpenseHandler, addExpenseHandler(dependencies));

afterEach(() => {
    dependencies.storageManager.removeAll().then(result => expect(result).toBe(true)).catch(err => expect(err).toBeUndefined);
})

describe('Test add Expense process', () => {
    test('parse body part', async () => {
        let req: Partial<Request>
        req = {
            body: {
                id: 'blah',
                type: 'food',
                amount: 12.45
            }
        };
        let res: Partial<Response>;
        res = {
            locals: {
                expense: {}
            }
        };
        const next = (() => {}) as NextFunction;
        await parseBodyToExpenseHandler()(req as Request, res as Response, next as NextFunction);
        expect(res.locals.expense).toEqual<Expense>(expense);
    })

    test('add expense handler part', async () => {
        let req = {};
        let res: Partial<Response>;
        res = {
            locals: {
                expense: expense
            }
        };
        const next = (() => {}) as NextFunction;
        await addExpenseHandler(dependencies)(req as Request, res as Response, next as NextFunction);
        expect(res.locals.expenses).toEqual<Expense[]>([expense])
    })

    test('controller add main method part', async () => {
        let req = {};
        let res: Partial<Response>;
        const expenses: Expense[] = [expense]
        res = {
            locals: {
                expenses: expenses
            },
            send: jest.fn()
        };
        const next = (() => {}) as NextFunction;
        expenseController.add()(req as Request, res as Response, next as NextFunction);
        expect(res.send).toBeCalledWith(expenses);
    });
})
