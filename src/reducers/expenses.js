
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [...state, action.expense];
        case "REMOVE_EXPENSE":
            return state.filter(({ id }) => id !== action.id);
        case "SET_EXPENSES":
            return action.expenses;
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

export default expensesReducer;