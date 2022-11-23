import { expense } from "../../../../fixtures/expense";
import { FileService } from "@service/file/fileService";
import { IStorageConfig } from "@domain/expense/IStorageConfig";
import { ExpenseFileMapper } from "@infrastructure/expense/fileStorage/ExpenseFileMapper";
import { ExpenseFileRepository } from "@infrastructure/expense/fileStorage/ExpenseFileRepository";
import { ExpenseFileStorageManager } from "@infrastructure/expense/fileStorage/ExpenseFileStorageManager";
import path from "path";

const mapper = new ExpenseFileMapper();
const fileService = new FileService();
const addBadInitialContentStorageConfig: IStorageConfig = {
    host: path.resolve('./', __dirname, 'addExpenseFileStorageHandlerBadInitialContentTest.json')
};
const addBadInitialContentRepository = new ExpenseFileRepository(addBadInitialContentStorageConfig, {fileService: fileService});
const addBadInitialContentExpenseHandler = new ExpenseFileStorageManager(mapper, addBadInitialContentRepository);

test('add expense failure on parse initial content', () => {
    expect.assertions(1);
    return addBadInitialContentExpenseHandler.add(expense)
        .catch(err => {
            expect(err.message).toMatch('Unexpected token , in JSON at position 1');
        });
});

test('add expense failure on parse initial content', () => {
    expect.assertions(1);
    return addBadInitialContentExpenseHandler.readAll()
        .catch(err => {
            expect(err.message).toMatch('Unexpected token , in JSON at position 1');
        });
});
