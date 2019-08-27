import axios from 'axios';

const url = "https://service.blackbookcloud.com/UsedCarWs/UsedCarWs/UsedVehicle";

export function getBlackVin(vin) {
    return dispatch => {
        axios.get(url + '/' + encodeURIComponent("VIN") + `/${vin}?customerid=` + encodeURIComponent("test")).then(res => {
            console.log(res.data)
            dispatch({
                type: 'GET_BLACK_VIN',
                blackVin: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export default function reducer(blackVin = [], action) {
    switch(action.type) {
        case "GET_BLACK_VIN":
            return action.blackVin
        default: 
            return blackVin
    }
}