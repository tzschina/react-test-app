import moment from 'moment';

/**
 * test data provided here
 */


 export default [
    {
        id:'1',
        desc: "Gum",
        note: 'note',
        amount:2.2,
        createdAt: 0
    },
    {
        id:'2',
        desc: "Coke",
        note: 'note2',
        amount:4.2,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    },
    {
        id:'3',
        desc: "Card",
        note: 'note3',
        amount:100.2,
        createdAt: moment(0).add(4, 'days').valueOf()
    }
 ]