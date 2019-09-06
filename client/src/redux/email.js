import axios from 'axios';

function setEmail(email) {
    return {
        type: "SET_EMAIL",
        email
    }
}

export function sendEmail(email) {
    return dispatch => {
        axios.post('/send', email).then(res => {
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