import axios from 'axios';

const url = "https://service.blackbookcloud.com/UsedCarWs/UsedCarWs/"

export function getMakes(year) {
    return dispatch => {
        axios.get(url + 'Drilldown/' + encodeURIComponent("ALL") + '/' + encodeURIComponent(year) + '?drilldeep=' + encodeURIComponent('false') + '&getclass=' + encodeURIComponent("false") + "&customerid=" + encodeURIComponent('false')).then(res => {
            dispatch({
                type: 'GET_MAKES2',
                blackValue: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export function getModels(year, make) {
    return dispatch => {
        axios.get(url + 'Drilldown/' + encodeURIComponent("ALL") + '/' + encodeURIComponent(year) + '/' + encodeURIComponent(make) + '?drilldeep=' + encodeURIComponent('false') + '&getclass=' + encodeURIComponent("false") + "&customerid=" + encodeURIComponent('false')).then(res => {
            console.log(res.data)
            dispatch({
                type: 'GET_MODELS2',
                blackValue: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export function getTrims(year, make, model) {
    return dispatch => {
        axios.get(url + "Drilldown/" + encodeURIComponent("ALL") + '/' + encodeURIComponent(year) + '/' + encodeURIComponent(make) + '?model=' + encodeURIComponent(model) + '&drilldeep=' + encodeURIComponent('false') + '&getclass=' + encodeURIComponent("false") + "&customerid=" + encodeURIComponent('test')).then(res => {
            console.log(res.data)
            dispatch({
                type: "GET_TRIMS2",
                blackValue: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export function getValue(uvc, miles) {
    return dispatch => {
        axios.get(url + "UsedVehicle/UVC/" + encodeURIComponent(uvc) + '?mileage=' + encodeURIComponent(miles) + '&customerid=' + encodeURIComponent("test")).then(res => {
            console.log('GET_BLACK_VALUE: ', res.data)
            dispatch({
                type: "GET_VALUE2",
                blackValue: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export function getVin(vin, miles) {
    return dispatch => {
        axios.get(url + "UsedVehicle/" + encodeURIComponent("VIN") + '/' + encodeURIComponent(vin) + '?mileage=' + encodeURIComponent(miles) + '&customerid=' + encodeURIComponent("test")).then(res => {
            dispatch({
                type: 'GET_VIN2',
                blackValue: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}
 
export default function reducer(blackValue = [], action) {
    switch(action.type) {
        case "GET_VALUE2":
            return action.blackValue
        case "GET_VIN2":
            return action.blackValue
        case "GET_MAKES2":
            return action.blackValue
        case "GET_MODELS2":
            return action.blackValue
        case "GET_TRIMS2":
            return action.blackValue
        default:
            return blackValue
    }
}