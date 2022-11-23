import { unlink } from "fs";

export const removeFile = (path: string): Promise<boolean> => {
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
