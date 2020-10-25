import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpenseSummary from './ExpenseSummary';

const ExpenseDahsboardPage = () => (
    <div>
        <ExpenseSummary/>
        <ExpenseList/>
        <ExpenseListFilters/>
    </div>
);


export default ExpenseDahsboardPage;