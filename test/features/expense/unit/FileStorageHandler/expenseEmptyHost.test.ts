import { expense } from "../../../../fixtures/expense";
import { FileService } from "@service/file/fileService";
import { IStorageConfig } from "@domain/expense/IStorageConfig";
import { ExpenseFileMapper } from "@infrastructure/expense/fileStorage/ExpenseFileMapper";
import { ExpenseFileRepository } from "@infrastructure/expense/fileStorage/ExpenseFileRepository";
import { ExpenseFileStorageManager } from "@infrastructure/expense/fileStorage/ExpenseFileStorageManager";

const fileService = new FileService();
const emptyStorageConfig: IStorageConfig = {
    host: undefined
}
const mapper = new ExpenseFileMapper();
const emptyHostRepository = new ExpenseFileRepository(emptyStorageConfig, {fileService: fileService});
const emptyHostExpenseHandler = new ExpenseFileStorageManager(mapper, emptyHostRepository);

test('add expense failure on storage configuration', () => {
    expect.assertions(1);
    return emptyHostExpenseHandler.add(expense)
        .catch(err => {
            expect(err.message).toMatch("config.host is undefined");
        });
});

test('read all expenses failure on empty host', () => {
    expect.assertions(1);
    return emptyHostExpenseHandler.readAll()
        .catch(err => {
            expect(err.message).toMatch("config.host is undefined");
        });
});
