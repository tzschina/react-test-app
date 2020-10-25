import React from 'react';
import getExpensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';
import { connect } from 'react-redux';
import numeral from 'numeral';

export const ExpenseSummary = (props) => (
    <div>
    Viewing {props.expenseCount} expense{props.expenseCount > 1 ? 's' : ''} totalling {numeral(props.expenseTotal).format('$0,00.0')}
    </div>
);

const mapStateToProps= (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    return {
        expenseCount: visibleExpenses.length,
        expenseTotal: getExpensesTotal(visibleExpenses)
    }
};


export default connect(mapStateToProps)(ExpenseSummary);