import React from 'react';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../actions/expenses';
import { connect } from 'react-redux';


export class AddExpensePage extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(expense) {
        this.props.addExpense(expense);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>AddExpensePage
            <h1>Add Expense</h1>
            <ExpenseForm handleExpense={this.handleSubmit}/>
        </div>
        );
    }

};


const mapDispatchToProps = (dispatch) => (
    {
        addExpense: (expense) => dispatch(addExpense(expense))
    }
);

export default connect(undefined, mapDispatchToProps)(AddExpensePage);