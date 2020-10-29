import React from 'react';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';
import { connect } from 'react-redux';


export class AddExpensePage extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(expense) {
        this.props.startAddExpense(expense);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container"><h1>Add Expense</h1></div>
                </div>
                <div className="content-container">
                    <ExpenseForm handleExpense={this.handleSubmit} />
                </div>
            </div>
        );
    }

};


const mapDispatchToProps = (dispatch) => (
    {
        startAddExpense: (expense) => dispatch(startAddExpense(expense))
    }
);

export default connect(undefined, mapDispatchToProps)(AddExpensePage);