import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import moment from 'moment';
import numeral from 'numeral';


const ExpenseListItem = (props) => (
    <div>
        <div>Amount: {numeral(props.amount).format('$0,00.0')}, Description: {props.desc}, Note: {props.note}, CreatedAt: {moment(props.createdAt).format('YYYY-MM-DD')}</div>
        <Link to={`/edit/${props.id}`}>{props.desc}</Link>
    </div>
);

export default connect()(ExpenseListItem);