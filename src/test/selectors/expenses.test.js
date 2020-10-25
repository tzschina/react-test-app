import expenses from '../fixtures/expenses';
import getExpensesTotal from '../../selectors/expenses-total';


test('Should return 0 if no expenses', () => {
    expect(getExpensesTotal([])).toBeCloseTo(0);
});


test('Should return single expense when single item', () => {
    expect(getExpensesTotal([expenses[0]])).toBeCloseTo(2.2);
});


test('Should return sum when multiple item', () => {
    expect(getExpensesTotal(expenses)).toBeCloseTo(106.6);
});