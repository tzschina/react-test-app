import { addExpense, removeExpense, editExpense, startAddExpense } from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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
        id: "",
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


// done here asks jest to wait the async call
test('should add expense to database and store', (done)=> {
    const store = createMockStore({});
    const expense = {
        desc: 'Mouse',
        amount: 3000,
        note: 'good',
        createdAt: 0
    }
    store.dispatch(startAddExpense(expense)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expense
            }
        });
        database.ref('expenses/' + actions[0].expense.id).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual(expense);
            done();
        });
    });
});
