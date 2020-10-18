import React from 'react';
import ExpenseForm from './ExpenseForm';
import {connect} from 'react-redux';
import {editExpense,removeExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleEdit(expense) {
        this.props.editExpense({ id: this.props.expense.id, updates: expense});
        this.props.history.push('/');
    }

    handleRemove() {
        this.props.removeExpense({id: this.props.expense.id});
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
            <ExpenseForm expense={this.props.expense} handleExpense={this.handleEdit}/>
            <button onClick={this.handleRemove}>Remove</button>
            </div>
        )
    };
};


const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id )
});

const mapDispatchToProps = (dispatch) => ({
    editExpense: (update) => dispatch(editExpense(update)),
    removeExpense: (id) => dispatch(removeExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);