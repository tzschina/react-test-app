import { Link } from 'react-router-dom';
import React from 'react';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';

export const Header = (props) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link to="/dashboard" className="header__title"> <h1>Expensify</h1> </Link>
                <button onClick={props.startLogout} className="button button--link">Logout</button>
            </div>
        </div>
    </header>
);


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})


export default connect(undefined, mapDispatchToProps)(Header);