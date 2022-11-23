import { expense, expenses } from "../../../../fixtures/expense";
import { FileService } from "@service/file/fileService";
import { IStorageConfig } from "@domain/expense/IStorageConfig";
import { ExpenseFileMapper } from "@infrastructure/expense/fileStorage/ExpenseFileMapper";
import { ExpenseFileRepository } from "@infrastructure/expense/fileStorage/ExpenseFileRepository";
import { ExpenseFileStorageManager } from "@infrastructure/expense/fileStorage/ExpenseFileStorageManager";
import path from "path";

const fileService = new FileService();
const addStorageConfig: IStorageConfig = {
    host: path.resolve('./', __dirname, 'addExpenseHandlerTest.json')
};
const mapper = new ExpenseFileMapper();
const addRepository = new ExpenseFileRepository(addStorageConfig, {fileService: fileService});
const addExpenseHandler = new ExpenseFileStorageManager(mapper, addRepository);

test('add an read expense', async () => {
    await addExpenseHandler.add(expense)
        .then((expense) => {
            expect(expense[0].type).toBe('food');
            expect(expense[0].amount).toBe(12.45);
        });
    await addExpenseHandler.readAll()
        .then((expenses) => {
            expect(expenses[0].type).toBe('food');
            expect(expenses[0].amount).toBe(12.45);
        });
    await addExpenseHandler.removeAll().then(result => expect(result).toBe(true)).catch(err => err);
});

test('add an read several expenses', async () => {
    await addExpenseHandler.add(expenses[0])
        .then((expense) => {
            expect(expense[0].type).toBe('tools');
            expect(expense[0].amount).toBe(100.01);
        });
    await addExpenseHandler.add(expenses[1])
        .then((expense) => {
            expect(expense[1].type).toBe('moto');
            expect(expense[1].amount).toBe(2800);
        });
    await addExpenseHandler.readAll()
        .then((expenses) => {
            expect(expenses[0].type).toBe('tools');
            expect(expenses[0].amount).toBe(100.01);
            expect(expenses[1].type).toBe('moto');
            expect(expenses[1].amount).toBe(2800);
        });
    await addExpenseHandler.removeAll().then(result => expect(result).toBe(true)).catch(err => err);
});
