import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test('should start with initial state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state.length).toBe(2);
    expect(state).toEqual([expenses[0], expenses[2]]);
});