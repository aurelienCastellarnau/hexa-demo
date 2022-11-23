import { NextFunction, Request, Response } from "express";
import { Expense } from "@domain/expense/Expense";
import { IExpenseDependencies } from "@domain/expense/handler/IExpenseDependencies";

export const addExpenseHandler = (dependencies: IExpenseDependencies) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const input = res.locals.expense as Expense;
        await dependencies.storageManager.add(input)
            .then((expenses) => {
                res.locals.expenses = expenses;
                next();
            })
            .catch((err) => {
                next(err);
            });
    }
}
