import { readFile as read} from "fs"

export const readFile = (path: string, options: {}): Promise<string> => {
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
