import { isExpense } from '@domain/expense/Expense';

describe('Test isExpense type guard failure', () => {
    test('when an invalid type is provided', () => {
        const invalidTypeExpense: Object = {
            type: 10,
            amount: 12.45
        };
        try {
            isExpense(invalidTypeExpense)
        } catch (err) {
            expect(err).toStrictEqual(new Error("Following properties are invalid, object can't match Expense: type: 10"));
        }
    });

    test('when an invalid amount is provided', () => {
        const invalidAmountExpense: Object = {
            type: 'valid Type',
            amount: 'not a number'
        };
        try {
            isExpense(invalidAmountExpense)
        } catch (err) {
            expect(err).toStrictEqual(new Error("Following properties are invalid, object can't match Expense: amount: not a number"));
        }
    });
});
