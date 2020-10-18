import { v4 as uuid } from 'uuid';

export const addExpense = ({ desc = "", note = "", amount = 0, createdAt = 0 } = {}) => (
    {
        type: "ADD_EXPENSE",
        expense: {
            id: uuid(),
            desc,
            amount,
            createdAt,
            note
        }
    }
);

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