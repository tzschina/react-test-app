import { addExpense, removeExpense, editExpense, startAddExpense,startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);
const uid = "testUid";

beforeEach((done)=> {
    const expensesData = {};
    expenses.forEach(({id, desc, note, amount, createdAt}) => {
        expensesData[id] = {desc, note, amount, createdAt};
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(()=> {
        done();
    })
});

test('should setup remove expense action object', () => {
    const action = removeExpense('test-id');
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
    const store = createMockStore({auth: {uid}});
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
        database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual(expense);
            done();
        });
    });
});


test('should fetch expenses from firebase', (done)=> {
    const store = createMockStore({auth: {uid}});
    store.dispatch(startSetExpenses()).then(()=> {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses
        });
        done();
    });
});


test('should remove expense to database and store', (done)=> {
    const store = createMockStore({ auth: {uid}});
    store.dispatch(startRemoveExpense(expenses[0].id)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: expenses[0].id,
        });
        

        database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            const firebaseExpenses = [];
            snapshot.forEach((childSnapshot) => {
                firebaseExpenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            expect(firebaseExpenses).toEqual([expenses[1], expenses[2]]);
            done();
        });
    });
});

test('should update the expense to database and store', (done)=> {
    const store = createMockStore({auth: {uid}});
    const updateExpense = expenses[0];
    updateExpense.desc = 'updatedDesc';
    updateExpense.note = 'updatedNote';
    updateExpense.amount = 9999;
    const updates = { desc: updateExpense.desc, note: updateExpense.note, amount: updateExpense.amount, createdAt: updateExpense.createdAt };

    store.dispatch(startEditExpense({id:expenses[0].id, updates})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: actions[0].id,
            updates
        });
        
        database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual(updates);
            done();
        });
    });
});
