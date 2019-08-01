import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


export function sendEmail(email) {
    return dispatch => {
        axios.post('/api/send_email', email).then(response => {
            dispatch({
                type: 'SEND_EMAIL',
                email: response
            })
        }).catch(err => {console.log(err)})
    }
}

const initialEmail = [];

const reducer = (email = initialEmail, action) => {
    switch(action.type) {
        case "SEND_EMAIL":
            return action.email;
        default: 
            return email
    }
}

export default createStore(
    reducer, 
    applyMiddleware(thunk)
)