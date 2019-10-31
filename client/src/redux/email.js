import axios from 'axios';

export function sendEmail(email) {
    return dispatch => {
        axios.post('/vehicle', email).then(res => {
            dispatch({ type: "SEND_EMAIL", email: res.data })
        }).catch(err => {
            throw err;
        })
    }
}

export default function reducer(email = [], action) {
    switch(action.type) {
        case 'SEND_EMAIL':
            return action.email
        default: 
            return email

    }
}