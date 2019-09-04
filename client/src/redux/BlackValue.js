import axios from 'axios';

const url = "https://service.blackbookcloud.com/UsedCarWs/UsedCarWs/UsedVehicle/"

export function getBlackValue(uvc, miles) {
    return dispatch => {
        axios.get(url + "UVC/" + encodeURIComponent(uvc) + '?mileage=' + encodeURIComponent(miles) + '&customerid=' + encodeURIComponent("test")).then(res => {
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

export function getBlackVin(vin, miles) {
    return dispatch => {
        axios.get(url + encodeURIComponent("VIN") + '/' + encodeURIComponent(vin) + '?mileage=' + encodeURIComponent(miles) + '&customerid=' + encodeURIComponent("test")).then(res => {
            dispatch({
                type: 'GET_BLACK_VIN',
                blackValue: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export function clearBlackValue() {
    return dispatch => {
        dispatch({
            type: "CLEAR_BLACK_VALUE",
            blackValue: []
        })
    }
}
 
export default function reducer(blackValue = [], action) {
    switch(action.type) {
        case "GET_BLACK_VALUE":
            return action.blackValue
        case "GET_BLACK_VIN":
            return action.blackValue
        case "CLEAR_BLACK_VALUE":
            return action.blackValue
        default:
            return blackValue
    }
}