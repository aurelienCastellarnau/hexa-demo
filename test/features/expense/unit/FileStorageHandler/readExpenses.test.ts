import { FileService } from "@service/file/fileService";
import { IStorageConfig } from "@domain/expense/IStorageConfig";
import { ExpenseFileMapper } from "@infrastructure/expense/fileStorage/ExpenseFileMapper";
import { ExpenseFileRepository } from "@infrastructure/expense/fileStorage/ExpenseFileRepository";
import { ExpenseFileStorageManager } from "@infrastructure/expense/fileStorage/ExpenseFileStorageManager";
import path from "path";

const fileService = new FileService();
const mapper = new ExpenseFileMapper();
const readStorageConfig: IStorageConfig = {
    host: path.resolve('./', __dirname, 'readExpenseHandlerTest.json')
}
const readRepository = new ExpenseFileRepository(readStorageConfig, {fileService: fileService});
const readExpenseHandler = new ExpenseFileStorageManager(mapper, readRepository);

test('read all expenses', () => {
    return readExpenseHandler.readAll()
        .then((expenses) => {
            expect(expenses[0].type).toBe('food');
            expect(expenses[0].amount).toBe(12.45);
            expect(expenses[1].type).toBe('tools');
            expect(expenses[1].amount).toBe(100.01);
            expect(expenses[2].type).toBe('moto');
            expect(expenses[2].amount).toBe(2800);
        });
});
