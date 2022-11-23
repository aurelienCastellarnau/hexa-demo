import { FileService } from "@service/file/fileService";
import { IStorageConfig } from "@domain/expense/IStorageConfig";
import { ExpenseFileMapper } from "@infrastructure/expense/fileStorage/ExpenseFileMapper";
import { ExpenseFileRepository } from "@infrastructure/expense/fileStorage/ExpenseFileRepository";
import { ExpenseFileStorageManager } from "@infrastructure/expense/fileStorage/ExpenseFileStorageManager";
import path from "path";

const fileService = new FileService();
const mapper = new ExpenseFileMapper();
const badFormatStorageConfig: IStorageConfig = {
    host: path.resolve('./', __dirname, 'readExpenseHandlerBadFormatTest.json')
}
const badFormatRepository = new ExpenseFileRepository(badFormatStorageConfig, {fileService: fileService});
const badFormatExpenseHandler = new ExpenseFileStorageManager(mapper, badFormatRepository);

test('read all expenses failure on badFormat content', () => {
    expect.assertions(1);
    return badFormatExpenseHandler.readAll()
        .catch(err => {
            expect(err.message).toMatch("Unexpected token , in JSON at position 1");
        });
});
