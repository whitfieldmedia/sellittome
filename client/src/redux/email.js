import axios from 'axios';

const url = '/send';

function setEmail(email) {
    return {
        type: "SET_EMAIL",
        email
    }
}

export function getEmails() {
    return dispatch => {
        axios.get(url).then(res => {
            dispatch(setEmail(res));
        }).catch(err => {
            console.log(err);
        })
    }
}

export function sendEmail(email) {
    return dispatch => {
        axios.post(url, email).then(res => {
            console.log(res.data)
            dispatch(setEmail(res.data))
        }).catch(err => {
            console.log(err)
        })
    }
}

export default function reducer(email = [], action) {
    switch(action.type) {
        case 'SET_EMAIL':
            return action.email
        default: 
            return email

    }
}