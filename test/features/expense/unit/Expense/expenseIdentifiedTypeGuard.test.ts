import { isIdentifiedExpense } from '@domain/expense/Expense';

describe('Test isIdentifiedExpense type guard', () => {
    test('when a valid identified expense is provided', () => {
        const validExpense: Object = {
            id: 'uuid',
            type: 'food',
            amount: 12.45
        };
        let errStamp = undefined;
        try {
            if (isIdentifiedExpense(validExpense)) {
                expect(validExpense.id).toBe('uuid');
                expect(validExpense.type).toBe('food');
                expect(validExpense.amount).toBe(12.45);
            }
        } catch (err) {
            errStamp = err; 
        }
        expect(errStamp).toBeUndefined();
    });
});
