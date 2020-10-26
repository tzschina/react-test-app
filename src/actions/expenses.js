import { v4 as uuid } from 'uuid';
import database from '../firebase/firebase';

export const addExpense = ( expense = {}) => (
    {
        type: "ADD_EXPENSE",
        expense
    }
);

export const startAddExpense = ( expense = {}) => {
    return (dispatch) => {
        const { desc = "", note = "", amount = 0, createdAt = 0 } = expense;
        const expenseFireBaseData = {
            desc, note, amount, createdAt
        };
        //This returns a promise chain so that later we could do more .then() call
        return database.ref("expenses").push(expenseFireBaseData).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expenseFireBaseData
            }))
        });
    };
};

export const removeExpense = ( id ) => (
    {
        type: "REMOVE_EXPENSE",
        id
    }
);

export const startRemoveExpense = (id) => {
    return (dispatch) => {
        return database.ref("expenses/"+id).remove().then(() => {
            dispatch(removeExpense(id));
        });
    };
};

export const editExpense = ({ id, updates }) => (
    {
        type: "EDIT_EXPENSE",
        id,
        updates
    }
);

export const startEditExpense = ({ id, updates }) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense({ id, updates }));
        });
    };
};

export const setTextFilter = (text = '') => (
    {
        type: "SET_TEXT_FILTER",
        text
    }
);

export const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref("expenses").once('value').then((snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            })
            dispatch(setExpenses(expenses));
        });
    };
};