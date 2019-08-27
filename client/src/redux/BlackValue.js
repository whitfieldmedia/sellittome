import axios from 'axios';

const url = "https://service.blackbookcloud.com/UsedCarWs/UsedCarWs/UsedVehicle/UVC/"

export function getBlackValue(uvc) {
    return dispatch => {
        axios.get(url + encodeURIComponent(uvc) + '?customerid=' + encodeURIComponent("test")).then(res => {
            console.log('GET_BLACK_VALUE: ', res.data)
            dispatch({
                type: "GET_BLACK_VALUE",
                blackValue: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export default function reducer(blackValue = [], action) {
    switch(action.type) {
        case "GET_BLACK_VALUE":
            return action.blackValue
        default:
            return blackValue
    }
}