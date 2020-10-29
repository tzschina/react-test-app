import React from 'react';
import getExpensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';
import { connect } from 'react-redux';
import numeral from 'numeral';
import {Link} from 'react-router-dom';

export const ExpenseSummary = (props) => (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">Viewing <span>{props.expenseCount}</span> expense{props.expenseCount > 1 ? 's' : ''} totalling <span>{numeral(props.expenseTotal).format('$0,00.0')}</span></h1>
            <div className="page-header__actions">
            <Link className="button" to="/create">Add Expense</Link>
            </div>
            </div>

    </div>
);

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    return {
        expenseCount: visibleExpenses.length,
        expenseTotal: getExpensesTotal(visibleExpenses)
    }
};


export default connect(mapStateToProps)(ExpenseSummary);