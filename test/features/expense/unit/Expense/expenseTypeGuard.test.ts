import { isExpense } from '@domain/expense/Expense';

describe('Test isExpense type guard', () => {
    test('when a valid unidentified expense is provided', () => {
        const validExpense: Object = {
            type: 'food',
            amount: 12.45
        };
        let errStamp = undefined;
        try {
            if (isExpense(validExpense)) {
                expect(validExpense.type).toBe('food');
                expect(validExpense.amount).toBe(12.45);
            }
        } catch (err) {
            errStamp = err; 
        }
        expect(errStamp).toBeUndefined();
    });
});
