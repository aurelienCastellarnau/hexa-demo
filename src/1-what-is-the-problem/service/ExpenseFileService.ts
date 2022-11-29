import {
    writeFile as write,
    readFile as read,
    unlink,
    existsSync as exist
} from "fs";

export class ExpenseFileService {

    public writeFile = (path: string, content: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            write(path, content, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(content);
                }
            });
        })
    }

    public readFile = (path: string, options: {}): Promise<string> => {
        return new Promise((resolve, reject) => {
            read(path, options, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            });
        })
    }

    public removeFile = (path: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            unlink(path, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    public existsSync = (path: string) => {
        return exist(path);
    }
}
