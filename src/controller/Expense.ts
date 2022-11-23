import { Request, Response, NextFunction } from "express";
import { IExpressHandler } from "@infrastructure/expense/handler/IExpressHandler";

export class ExpenseController {
    public static handlers: IExpressHandler[];

    constructor (private parseBodyToExpenseHandler: IExpressHandler, private addExpenseHandler: IExpressHandler) {
        ExpenseController.handlers = [
            this.parseBodyToExpenseHandler,
            this.addExpenseHandler
        ]
    }

    public add = () => {
        return (req: Request, res: Response, next: NextFunction) => {
            res.send(res.locals.expenses);
        }
    }
}
