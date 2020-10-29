import React from 'react';
import { connect } from 'react-redux';
import getVisibleExpenses from '../selectors/expenses'
import ExpenseListItem from './ExpenseListItem';

export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
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