import { existsSync as exist} from "fs";

export const existsSync = (path: string) => {
    return exist(path);
}
