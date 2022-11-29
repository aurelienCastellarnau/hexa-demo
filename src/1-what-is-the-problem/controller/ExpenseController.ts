import { Request, Response, NextFunction } from "express";
import { ExpenseParserService } from "../service/ExpenseParserService";
import { ExpenseFileService } from "../service/ExpenseFileService";

export class ExpenseController {
    public parserService: ExpenseParserService;
    public fileService: ExpenseFileService;

    constructor () {
        this.parserService = new ExpenseParserService();
        this.fileService = new ExpenseFileService();
    }

    public add = () => {
        // parse body
        // validate
        // add to storage
        // send response
        return (req: Request, res: Response, next: NextFunction) => {
            res.send(res.locals.expenses);
        }
    }
}
