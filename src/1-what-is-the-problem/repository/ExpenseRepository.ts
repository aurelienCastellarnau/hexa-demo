import { FileService } from "@service/file/fileService";
import { IExpenseRepository } from "@domain/expense/IExpenseRepository";
import { IStorageConfig } from "@domain/expense/IStorageConfig";
import { ExpenseFileService } from "../service/ExpenseFileService";

interface Config {
    host: string
}

export class ExpenseFileRepository implements IExpenseRepository {
    private config: Config;
    private fileService: ExpenseFileService;

    constructor (config: Config, fileService: ExpenseFileService) {
        this.config = config;
        this.fileService = fileService;
    };

    private configValidator = () => {
        if (this.config.host === undefined) {
            throw new Error('config.host is undefined')
        }
    }

    private initFile = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            if (!this.fileService.existsSync(this.config.host)) {
                this.fileService.writeFile(this.config.host, '[]')
                    .then(_ => resolve(true))
                    .catch(err => reject(err));
            } else {
                resolve(true);
            }
        })
    }

    public add = (expense: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            this.configValidator();

            this.initFile()
                .then((_) => {
                    this.fetchAll()
                        .then((storageContent: string) => {
                            let parsedContent: any[];
                            try {
                                parsedContent = <any[]> JSON.parse(storageContent);
                                parsedContent.push(JSON.parse(expense));
                            } catch (err) {
                                reject(err);
                                return;
                            }
                            this.fileService.writeFile(this.config.host, JSON.stringify(parsedContent))
                                .then(expense => {
                                    resolve(expense)
                                });
                        });
                })
                .catch(err => reject(err));
        })
    }
    
    public fetchAll = (): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            this.configValidator();

            this.fileService.readFile(this.config.host, {})
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    public removeAll = (): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            this.configValidator();

            this.fileService.removeFile(this.config.host)
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }
}
