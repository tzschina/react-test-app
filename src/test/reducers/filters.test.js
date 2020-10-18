import moment from 'moment';
import filtersReducer from '../../reducers/filters';

/**
 * test with any reducer's default state
 */
test('should initial state with default values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: "date",
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});


test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});