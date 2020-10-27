import { NavLink } from 'react-router-dom';
import React from 'react';
import {startLogout} from '../actions/auth';
import {connect} from 'react-redux';

export const Header = (props) => (
    <header><h1>Expensify</h1>
        <div>
            <NavLink to="/" activeClassName="is-active" exact={true}> Home </NavLink>
            <NavLink to="/create" activeClassName="is-active"> Create Expense </NavLink>
            <NavLink to="/help" activeClassName="is-active"> Help </NavLink>
            <button onClick={props.startLogout}>Logout</button>
        </div>
    </header>
);


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})


export default connect(undefined,mapDispatchToProps)(Header);