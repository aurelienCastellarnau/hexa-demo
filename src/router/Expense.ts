import { Express } from "express";
import { ExpenseController } from "@controller/Expense";
import { IRoute } from "./Router";

export class Expense implements IRoute {
    constructor(public controller: ExpenseController){};

    public setup = (app: Express) => {
        app.use('/expense', ExpenseController.handlers);
        app.post('/expense', this.controller.add)
    }
}
