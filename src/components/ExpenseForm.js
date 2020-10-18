import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            desc: props.expense ? props.expense.desc : '',
            amount: props.expense ? props.expense.amount :  '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            createdAtCalendarFocus: false,
            error: undefined
        }
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCalendarFocusChange = this.handleCalendarFocusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDescriptionChange(event) {
        const desc = event.target.value;
        this.setState(() => ({ desc }));
    };

    handleAmountChange(event) {
        const amount = event.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };

    handleNoteChange(event) {
        const note = event.target.value;
        this.setState(() => ({ note }));
    };

    handleDateChange(createdAt) {
        if (createdAt) {
            this.setState(() => ( { createdAt } ));
        }
    }

    handleCalendarFocusChange({ focused }) {
        this.setState(() => ({ createdAtCalendarFocus: focused }));
    }

    handleSubmit(event) {
        event.preventDefault();
        if(!this.state.desc || !this.state.amount) {
            this.setState(() => ({error: 'Description and amount must be entered'}));
        } else {
            this.setState(() => ({error: undefined}));
            this.props.handleExpense(
                {
                    amount: parseFloat(this.state.amount),
                    desc: this.state.desc,
                    note: this.state.note,
                    createdAt: this.state.createdAt.valueOf()
                }
            );
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    { this.state.error && <div>{this.state.error}</div>}
                    <input type="text" placeholder="Description" autoFocus value={this.state.desc} onChange={this.handleDescriptionChange} />
                    <input type="text" placeholder="Amount" value={this.state.amount} onChange={this.handleAmountChange} />
                    <textarea placeholder="Add note" value={this.state.note} onChange={this.handleNoteChange} />
                    <SingleDatePicker
                        isOutsideRange={() => false}
                        numberOfMonths={1}
                        date={this.state.createdAt}
                        onDateChange={this.handleDateChange}
                        focused={this.state.createdAtCalendarFocus}
                        onFocusChange={this.handleCalendarFocusChange} />
                    <button>{this.props.expense ? 'Update': 'Add'} Expense</button>
                </form>
            </div>
        );
    };
};

export default ExpenseForm;