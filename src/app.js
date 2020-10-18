import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './stores/configureStore';
import { Provider } from 'react-redux';
import { addExpense } from './actions/expenses';

import './styles/style.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

console.log(store.getState());

const return1 = store.dispatch(addExpense({ amount: 150, desc: "water", note: "tesco", createdAt: 1601550000000 }));
const return2 = store.dispatch(addExpense({ amount: 550, desc: "coffee", note: "starbucks", createdAt: 1602327600000 }));
const return3 = store.dispatch(addExpense({ amount: 300, desc: "rent", note: "home", createdAt: 1601982000000 }));


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));




