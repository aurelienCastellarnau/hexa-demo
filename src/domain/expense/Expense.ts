export interface Expense {
    id: string,
    type: string,
    amount: number
}

export const isExpense = (input: any): input is Expense => {
    let invalidProperties = [];

    if (!input.hasOwnProperty('type') || typeof input.type !== 'string') {
        invalidProperties.push(`type: ${input.type}`);
    }

    if (!input.hasOwnProperty('amount') || typeof input.amount !== 'number') {
        invalidProperties.push(`amount: ${input.amount}`);
    }

    if (invalidProperties.length > 0) {
        throw new Error(`Following properties are invalid, object can't match Expense: ${invalidProperties.join(', ')}`);
    }

    return true;
}

export const isIdentifiedExpense = (input: any): input is Expense => {
    isExpense(input);
    if (!input.hasOwnProperty('id') || !input.id) {
        throw new Error(`Unidentified expense provided: id: ${input.id}`);
    }

    return true;
}
