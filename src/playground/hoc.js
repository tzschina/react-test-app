import ReactDOM from 'react-dom';
import React from 'react';

const Info = (props) => (
    
        <div>
            The info is: {props.info}
        </div>
    
);

//HOC component
const infoLengthWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.info.length <= props.infoLengthRequired && <p> Warning !! Info too short</p> }
            <WrappedComponent {...props}/>
        </div>
    );
}

//Another HOC component
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.authenticated && <WrappedComponent {...props}/>}
        </div>
    );
}

const InfoCheck = infoLengthWarning(Info);
const AuthInfo = requireAuthentication(InfoCheck);


ReactDOM.render(<AuthInfo authenticated={true} info="Simon" infoLengthRequired="10" />, document.getElementById('app'));