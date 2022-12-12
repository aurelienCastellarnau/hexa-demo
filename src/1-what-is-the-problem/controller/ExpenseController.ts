import { Request, Response, NextFunction } from "express";
import { ExpenseParserService } from "../service/ExpenseParserService";
import { FileService } from "../service/FileService";
import { ExpenseValidatorService } from "../service/ExpenseValidatorService";
import { ExpenseRepository } from "../repository/ExpenseRepository";

export class ExpenseController {
    public parserService: ExpenseParserService;
    public fileService: FileService;
    public validatorService: ExpenseValidatorService;
    public repository: ExpenseRepository;

    // impossible d'abstraire les dépendances
    constructor () {
        this.parserService = new ExpenseParserService();
        this.fileService = new FileService();
        this.validatorService = new ExpenseValidatorService();
        this.repository = new ExpenseRepository({host: 'myhost.json'}, this.fileService);
    }

    // le code reste clair car le sujet est simpliste
    // le controller est responsable de plusieurs actions et on imagine bien
    // que dans le futur, il sera amené à porter beaucoup plus de complexité
    // les problématiques métier et techniques sont mélangées (parsing vs validation)
    public add = () => {
        return (req: Request, res: Response, next: NextFunction) => {
            let expense = this.parserService.parse(req.body);
            if (!this.validatorService.validate(expense)) {
                res.status(400);
                res.render('Bad format', expense);
            };
            this.repository.add(expense);
            res.status(202);
            res.send('Expense added');
        }
    }
}
