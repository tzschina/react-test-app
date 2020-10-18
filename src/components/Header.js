import { NavLink } from 'react-router-dom';
import React from 'react';

const Header = () => (
    <header><h1>Expensify</h1>
        <div>
            <NavLink to="/" activeClassName="is-active" exact={true}> Home </NavLink>
            <NavLink to="/create" activeClassName="is-active"> Create Expense </NavLink>
            <NavLink to="/help" activeClassName="is-active"> Help </NavLink>
        </div>
    </header>
);

export default Header;