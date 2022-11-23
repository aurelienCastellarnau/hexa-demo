import { writeFile } from "@service/file/write";
import { readFile } from "@service/file/read";
import { removeFile } from "@service/file/remove";
import { existsSync } from "@service/file/existsSync";

export class FileService {
    public writeFile = writeFile;
    public readFile = readFile;
    public removeFile = removeFile;
    public existsSync = existsSync;
}
