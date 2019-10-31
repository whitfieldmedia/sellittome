import axios from 'axios';

const url = "https://service.blackbookcloud.com/UsedCarWs/UsedCarWs/"

export function getMakes(year) {
    return dispatch => {
        axios.get(url + 'Drilldown/' + encodeURIComponent("ALL") + '/' + encodeURIComponent(year) + '?drilldeep=' + encodeURIComponent('false') + '&getclass=' + encodeURIComponent("false") + "&customerid=" + encodeURIComponent('false')).then(res => {
            dispatch({
                type: 'GET_MAKES2',
                makes: res.data
            })
        }).catch(err => {
            throw err;
        })
    }
}

export function getModels(year, make) {
    return dispatch => {
        axios.get(url + 'Drilldown/' + encodeURIComponent("ALL") + '/' + encodeURIComponent(year) + '/' + encodeURIComponent(make) + '?drilldeep=' + encodeURIComponent('false') + '&getclass=' + encodeURIComponent("false") + "&customerid=" + encodeURIComponent('false')).then(res => {
            dispatch({
                type: 'GET_MODELS2',
                models: res.data
            })
        }).catch(err => {
            throw err;
        })
    }
}

export function getTrims(year, make, model) {
    return dispatch => {
        axios.get(url + "Drilldown/" + encodeURIComponent("ALL") + '/' + encodeURIComponent(year) + '/' + encodeURIComponent(make) + '?model=' + encodeURIComponent(model) + '&drilldeep=' + encodeURIComponent('false') + '&getclass=' + encodeURIComponent("false") + "&customerid=" + encodeURIComponent('test')).then(res => {
            dispatch({
                type: "GET_TRIMS2",
                trims: res.data
            })
        }).catch(err => {
            throw err;
        })
    }
}

export function getValue(uvc, miles) {
    return dispatch => {
        axios.get(url + "UsedVehicle/UVC/" + encodeURIComponent(uvc) + '?mileage=' + encodeURIComponent(miles) + '&customerid=' + encodeURIComponent("test")).then(res => {
            dispatch({
                type: "GET_VALUE2",
                value: res.data
            })
        }).catch(err => {
            throw err;
        })
    }
}

export function getVin(vin, miles) {
    return dispatch => {
        axios.get(url + "UsedVehicle/" + encodeURIComponent("VIN") + '/' + encodeURIComponent(vin) + '?mileage=' + encodeURIComponent(miles) + '&customerid=' + encodeURIComponent("test")).then(res => {
            dispatch({
                type: 'GET_VIN2',
                vinValue: res.data
            })
        }).catch(err => {
            throw err;
        })
    }
}


var initialState = {
    makes: {},
    models: {},
    trims: {},
    vinValue: {},
    value: {}
}

export function purgeBlackValue() {
    return dispatch => {
        dispatch({
            type: "PURGE_BLACK_VALUE"
        });
    }
}
 
export default function reducer(blackValue = initialState, action) {
    switch(action.type) {
        case "GET_VALUE2":
            return action.value
        case "GET_VIN2":
            return action.vinValue
        case "GET_MAKES2":
            return action.makes
        case "GET_MODELS2":
            return action.models
        case "GET_TRIMS2":
            return action.trims
        case "PURGE_BLACK_VALUE":
            return {}
        default:
            return blackValue
    }
}