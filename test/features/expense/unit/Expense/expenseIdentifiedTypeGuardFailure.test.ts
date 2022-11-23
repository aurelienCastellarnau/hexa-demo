import { isIdentifiedExpense } from '@domain/expense/Expense';

describe('Test isIdentifiedExpense type guard failure', () => {
    test('when an unindentified expense is provided', () => {
        const unidentifiedExpense: Object = {
            type: 'valid type',
            amount: 12.45
        };
        try {
            isIdentifiedExpense(unidentifiedExpense)
        } catch (err) {
            expect(err).toStrictEqual(new Error("Unidentified expense provided: id: undefined"));
        }
    });
});
