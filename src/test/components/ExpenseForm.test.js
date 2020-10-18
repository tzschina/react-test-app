import React from 'react';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';
import ExpenseForm from '../../components/ExpenseForm';
import moment from 'moment';


//Without moment.js in the __mocks__ we will fail
test('should render ExpenseForm correctly', ()=> {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});


test('should render error for ExpenseForm with invalid submit', ()=> {
    const wrapper = shallow(<ExpenseForm />);

    //testing multipl snapshot: before
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {preventDefault: () => {
    }});

    expect(wrapper.state('error').length).toBeGreaterThan(0);

    //testing multipl snapshot: after
    expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit prop for valid form submission', ()=> {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm handleExpense={onSubmitSpy} expense={expenses[0]} / >);
    wrapper.find('form').simulate('submit', {preventDefault: () => {
    }});
    expect(wrapper.state('error')).toBe(undefined);
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        desc: expenses[0].desc,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});


test('should set new date on date change', ()=> {
    const wrapper = shallow(<ExpenseForm />);
    const now = moment();
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);

    expect(wrapper.state('createdAt')).toEqual(now);
});


test('should set desc on input change', ()=> {
    const value = 'test value';
    const wrapper = shallow(<ExpenseForm / >);
    wrapper.find('input').at(0).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('desc')).toBe(value);
});