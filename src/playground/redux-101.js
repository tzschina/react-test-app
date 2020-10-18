import { createStore } from 'redux';


//Action generator
const incCount = ({ scale = 1 } = {}) => ({
    type: 'INC',
    scale: scale
});

const decCount = ({ scale = 1 } = {}) => ({
    type: 'DEC',
    scale: scale
});

const setCount = ( {count }) => ({
    type: 'SET',
    count: count
});

const resetCount = () => ({
    type: 'RES'
});

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case "INC":
            return {
                count: state.count + action.scale
            };
        case "DEC":
            return {
                count: state.count - action.scale
            };
        case "SET":
            return {
                count: action.count
            };

        case "RES":
            return {
                count: 0
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);

store.subscribe(() => {
    console.log(store.getState());
});


store.dispatch(incCount());

store.dispatch(incCount({ scale: 5 }));


store.dispatch(decCount({ scale: 2 }));

store.dispatch(resetCount());

store.dispatch(setCount({ count:22 }));



