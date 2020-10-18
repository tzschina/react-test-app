import { addExpense, removeExpense, editExpense } from '../../actions/expenses';


test('should setup remove expense action object', () => {
    const action = removeExpense({ id: 'test-id' });
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: 'test-id'
    });
});



test('should setup edit expense action object', () => {
    const action = editExpense({
        id: 'test-id', updates: {
            partA: 'A',
            partB: 'B'
        }
    });
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: 'test-id',
        updates: {
            partA: 'A',
            partB: 'B'
        }
    });
});

test('should setup add expense action object', () => {
    const expenseData = {
        amount: 1000,
        note: 'note',
        createdAt:1000,
        desc: "desc"
    }

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});