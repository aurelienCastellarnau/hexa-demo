import { writeFile as write } from "fs";

export const writeFile = (path: string, content: string): Promise<string> => {
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
