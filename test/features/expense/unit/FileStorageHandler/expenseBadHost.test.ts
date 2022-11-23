import { expense } from "../../../../fixtures/expense";
import { FileService } from "@service/file/fileService";
import { IStorageConfig } from "@domain/expense/IStorageConfig";
import { ExpenseFileMapper } from "@infrastructure/expense/fileStorage/ExpenseFileMapper";
import { ExpenseFileRepository } from "@infrastructure/expense/fileStorage/ExpenseFileRepository";
import { ExpenseFileStorageManager } from "@infrastructure/expense/fileStorage/ExpenseFileStorageManager";
import path from "path";

const fileService = new FileService();
const badHostStorageConfig: IStorageConfig = {
    host: path.resolve('./', __dirname, '/badFolder', 'shouldNeverBeenWritten.json')
}
const mapper = new ExpenseFileMapper();
const badHostRepository = new ExpenseFileRepository(badHostStorageConfig, {fileService: fileService});
const badHostExpenseHandler = new ExpenseFileStorageManager(mapper, badHostRepository);

test('add expense failure on write file', () => {
    expect.assertions(1);
    return badHostExpenseHandler.add(expense)
        .catch(err => {
            expect(err.message).toMatch("ENOENT: no such file or directory, open '/badFolder/shouldNeverBeenWritten.json'");
        });
});

test('read all expenses failure on read file', () => {
    expect.assertions(1);
    return badHostExpenseHandler.readAll()
        .catch(err => {
            expect(err.message).toMatch("ENOENT: no such file or directory, open '/badFolder/shouldNeverBeenWritten.json'");
        });
});

test('remove storage failure on read file', () => {
    expect.assertions(1);
    return badHostExpenseHandler.removeAll()
        .catch(err => {
            expect(err.message).toMatch("ENOENT: no such file or directory, unlink '/badFolder/shouldNeverBeenWritten.json'");
        });
});
