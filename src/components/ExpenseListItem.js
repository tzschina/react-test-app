import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import moment from 'moment';
import numeral from 'numeral';


const ExpenseListItem = (props) => (
        
        <Link to={`/edit/${props.id}`} className="list-item">
        <div>
        <h3 className="list-item__title">{props.desc} ({props.note})</h3>
        <span className="list-item__subtitle">{moment(props.createdAt).format('YYYY-MM-DD')}</span>
        </div>
            <h3 className="list-item__data">{numeral(props.amount).format('$0,00.0')} </h3>
        </Link>
);

export default connect()(ExpenseListItem);