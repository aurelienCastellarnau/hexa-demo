import { FileService } from "@service/file/fileService";
import { IExpenseRepository } from "@domain/expense/IExpenseRepository";
import { IStorageConfig } from "@domain/expense/IStorageConfig";

interface IDependencies {
    fileService: FileService
}

export class ExpenseFileRepository implements IExpenseRepository {

    constructor (private config: IStorageConfig, private dependencies: IDependencies) {};

    private configValidator = () => {
        if (this.config.host === undefined) {
            throw new Error('config.host is undefined')
        }
    }

    private initFile = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            if (!this.dependencies.fileService.existsSync(this.config.host)) {
                this.dependencies.fileService.writeFile(this.config.host, '[]')
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
                            this.dependencies.fileService.writeFile(this.config.host, JSON.stringify(parsedContent))
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

            this.dependencies.fileService.readFile(this.config.host, {})
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    public removeAll = (): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            this.configValidator();

            this.dependencies.fileService.removeFile(this.config.host)
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }
}
