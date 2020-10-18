import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { initFilters, altFilters } from '../fixtures/filters';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import moment from 'moment';



let setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter, wrapper;

beforeEach(() => {
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    sortByAmount = jest.fn();
    sortByDate = jest.fn();
    setTextFilter = jest.fn();
    wrapper = shallow(<ExpenseListFilters filters={initFilters} 
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        sortByAmount={sortByAmount}
        sortByDate ={sortByDate}
        setTextFilter = {setTextFilter} />);
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});


test('should handle text change', ()=> {
    wrapper.find('input').simulate('change', {target: {value: altFilters.text}});
    expect(setTextFilter).toHaveBeenLastCalledWith(altFilters.text);
});

test('should handle sortBy date', ()=> {
    wrapper.find('select').simulate('change', {target: {value: initFilters.sortBy}});
    expect(sortByDate).toHaveBeenLastCalledWith();
});

test('should handle sortBy amount', ()=> {
    wrapper.find('select').simulate('change', {target: {value: altFilters.sortBy}});
    expect(sortByAmount).toHaveBeenLastCalledWith();
});


test('should handle date change', ()=> {
    const startDate = moment(0);
    const endDate = moment(0).add(1, 'days');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate: startDate, endDate: endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});


test('should handle date focus changes', ()=> {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});