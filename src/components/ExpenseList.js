import React from 'react';
import { connect } from 'react-redux';
import getVisibleExpenses from '../selectors/expenses'
import ExpenseListItem from './ExpenseListItem';

export const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.map((expense) => {
            return (
                <ExpenseListItem {...expense} key={expense.id} />
            );
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    }
};


export default connect(mapStateToProps)(ExpenseList);