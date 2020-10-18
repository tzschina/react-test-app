import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";


const ExpenseListItem = (props) => (
    <div>
        <div>Amount: {props.amount}, Description: {props.desc}, Note: {props.note}, CreatedAt: {props.createdAt}</div>
        <Link to={`/edit/${props.id}`}>{props.desc}</Link>
    </div>
);

export default connect()(ExpenseListItem);