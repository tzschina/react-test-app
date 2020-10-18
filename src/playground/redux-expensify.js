import { createStore, combineReducers } from 'redux';
import { v4 as uuid } from 'uuid';

const demoState = {
    expenses: [
        {
            id: "",
            desc: "description",
            note: "my note",
            amount: 10050,
            createdAt: 0
        }
    ],
    filters: {
        text: "rent",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined
    }
};

//Action creators
const addExpense = ({ desc = "", note = "", amount = 0, createdAt = 0 } = {}) => (
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

const removeExpense = ({ id }) => (
    {
        type: "REMOVE_EXPENSE",
        id
    }
);

const editExpense = ({ id, updates }) => (
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

const sortByAmount = () => (
    {
        type: "SORT_BY_AMOUNT"
    }
);

const sortByDate = () => (
    {
        type: "SORT_BY_DATE"
    }
);

const setStartDate = (startDate) => (
    {
        type: "SET_START_DATE",
        startDate
    }
);

const setEndDate = (endDate) => (
    {
        type: "SET_END_DATE",
        endDate
    }
);


const expensesReducerDefaultState = [];
const filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
};

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [...state, action.expense];
        case "REMOVE_EXPENSE":
            return state.filter(({ id }) => id !== action.id);
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id !== action.id) {
                    return expense;
                } else {
                    return {
                        ...expense,
                        ...action.updates
                    };
                }
            });
        default:
            return state;
    }
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {

    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = !text || expense.note.toLowerCase().includes(text.toLowerCase()) || expense.desc.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((expense1, expense2) => {
        if(sortBy === 'date') {
            return expense1.createdAt < expense2.createdAt ? 1: -1;
        } else if (sortBy === 'amount') {
            return expense1.amount < expense2.amount ? 1: -1;
        } else {
            return 0;
        }
    });
};



const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

store.subscribe(() => {
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses, state.filters));
}
);

const return1 = store.dispatch(addExpense({ amount: 150, desc: "006", note: "toy", createdAt: 1000 }));
const return2 = store.dispatch(addExpense({ amount: 550, desc: "007", note: "coffee", createdAt: 1100 }));
// const return3 = store.dispatch(removeExpense({ id: return2.expense.id }));
// const return4 = store.dispatch(editExpense({ id: return1.expense.id, updates: { amount: 155, desc: "005", note: "amazing toy" } }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(900));
// store.dispatch(setStartDate());
//store.dispatch(setEndDate(500));

