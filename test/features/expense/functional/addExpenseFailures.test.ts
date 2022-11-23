import { parseBodyToExpenseHandler } from "@infrastructure/expense/handler/parseBodyToExpenseHandler";
import { addExpenseHandler } from "@infrastructure/expense/handler/addExpenseHandler";
import { Request, Response, NextFunction } from "express";
import { IExpenseDependencies } from "@domain/expense/handler/IExpenseDependencies";
import { ExpenseFileRepository } from "@infrastructure/expense/fileStorage/ExpenseFileRepository";
import { ExpenseFileStorageManager } from "@infrastructure/expense/fileStorage/ExpenseFileStorageManager";
import { IExpenseStorageMapper } from "@domain/expense/IExpenseStorageMapper";
import { ExpenseFileMapper } from "@infrastructure/expense/fileStorage/ExpenseFileMapper";
import { IExpenseRepository } from "@domain/expense/IExpenseRepository";
import { IStorageConfig } from "@domain/expense/IStorageConfig";
import { FileService } from "@service/file/fileService";
import { expense } from '../../../fixtures/expense';


const storageConfigWithEmptyHost: IStorageConfig = {
    host: undefined,
}
const mapper: IExpenseStorageMapper = new ExpenseFileMapper();
const repositoryWithEmptyHost: IExpenseRepository = new ExpenseFileRepository(storageConfigWithEmptyHost, {fileService: new FileService()});
const dependenciesWithEmptyHost: IExpenseDependencies = {
    storageManager: new ExpenseFileStorageManager(mapper, repositoryWithEmptyHost),
}

describe('Test add Expense process failure', () => {
    test('When body parser receive bad body', () => {
        let req: Partial<Request>
        req = {
            body: {
                type: 'food',
                amount: 'string'
            }
        };
        let res: Partial<Response>;
        res = {
            locals: {
                expense: {}
            }
        };
        const next = jest.fn() as NextFunction;
        parseBodyToExpenseHandler()(req as Request, res as Response, next as NextFunction);
        expect(next).toBeCalledWith(new Error("Following properties are invalid, object can't match Expense: amount: string"));
    })

    test('when storageConfig dont provide host', async () => {
        let req = {};
        let res: Partial<Response>;
        res = {
            locals: {
                expense: expense
            }
        };
        const next = jest.fn();
        await addExpenseHandler(dependenciesWithEmptyHost)(req as Request, res as Response, next as NextFunction);
        expect(next).toBeCalledWith(new Error('config.host is undefined'));
    })
})
