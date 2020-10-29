
import { DateRangePicker } from 'react-dates';
import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';


export class ExpenseListFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            calendarFocused: null
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleFocusChange = this.handleFocusChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);
    }

    handleDateChange({ startDate, endDate }) {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    handleFocusChange(calendarFocused) {
        this.setState(() => ({ calendarFocused }));
    }

    handleTextChange(event) {
        this.props.setTextFilter(event.target.value);
    }

    handleSortByChange(event) {
        if (event.target.value === 'date') {
            this.props.sortByDate();
        }
        if (event.target.value === 'amount') {
            this.props.sortByAmount();
        }
    }

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input className="text-input" 
                        type='text' 
                        placeholder="Search expenses"
                        value={this.props.filters.text} 
                        onChange={this.handleTextChange} />
                    </div>
                    <div className="input-group__item">
                        <select
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={this.handleSortByChange}>
                            <option value='date'>Date</option>
                            <option value='amount'>Amount</option>
                        </select></div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.handleDateChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.handleFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            showClearDates={true}
                        /></div>
                </div>
            </div>
        )
    };
};




const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    sortByAmount: () => dispatch(sortByAmount()),
    sortByDate: () => dispatch(sortByDate()),
    setTextFilter: (text) => dispatch(setTextFilter(text))
});


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);