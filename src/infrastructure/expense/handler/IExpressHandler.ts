import { NextFunction, Request, Response } from "express";

export interface IExpressHandler {
    (req: Request, res: Response, next: NextFunction): void,
}
