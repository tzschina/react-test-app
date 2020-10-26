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
        return database.ref("expenses").push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        });
    };
};

export const removeExpense = ({ id }) => (
    {
        type: "REMOVE_EXPENSE",
        id
    }
);

export const editExpense = ({ id, updates }) => (
    {
        type: "EDIT_EXPENSE",
        id,
        updates
    }
);

const setTextFilter = (text = '') => (
    {
        type: "SET_TEXT_FILTER",
        text
    }
);