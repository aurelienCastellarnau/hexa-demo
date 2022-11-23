import { NextFunction, Request, Response } from "express";
import { Expense, isExpense } from "@domain/expense/Expense";

export const parseBodyToExpenseHandler = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            isExpense(req.body);
            let expense: Expense = {
                id: req.body.id,
                type: req.body.type,
                amount: req.body.amount
            };
            res.locals.expense = expense;
            next();
        } catch (err) {
            next(err);
        }
    }
}
