import React from 'react';
import {shallow} from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';



test('should render correctly', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={0} expenseTotal={100} />);
    expect(wrapper).toMatchSnapshot();
});