import axios from 'axios';

const url = "https://cloud.jdpower.ai/data-api/UAT/valuationservices/valuation/"

export function getYears() {
    return dispatch => {
        axios.get(url + 
            'years?period=0', 
            { headers: { "api-key": "8b159d1f-7b81-4499-8cb2-ed3f80f25924" } }
            ).then(res => {
            console.log(res.data)
            dispatch({
                type: 'GET_YEARS',
                years: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export function getMakes(year) {
    return dispatch => {
        axios.get(url + 
            `makes?period=0&vehicletype=UsedCar&modelyear=${year}`, 
            { headers: { "api-key": "8b159d1f-7b81-4499-8cb2-ed3f80f25924" } }
            ).then(res => {
            dispatch({
                type: 'GET_MAKES',
                years: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export function getModels(year, make) {
    return dispatch => {
        axios.get(url + 
            `models?period=0&vehicletype=UsedCar&modelyear=${year}&make=${make}`, 
            { headers: { "api-key": "8b159d1f-7b81-4499-8cb2-ed3f80f25924" } }
            ).then(res => {
            dispatch({
                type: "GET_MODELS",
                years: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export function getBodies(year, make, model) {
    return dispatch => {
        axios.get(url + `bodies?period=0&vehicletype=UsedCar&modelyear=${year}&make=${make}&model=${model}`, {
            headers: { "api-key": "8b159d1f-7b81-4499-8cb2-ed3f80f25924" } }
        ).then(res => {
            dispatch({
                type: "GET_BODIES",
                years: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export function getRegionId(statecode) {
    return dispatch => {
        axios.get(url + `regionIdByStateCode?statecode=${statecode}`, 
        { headers: { "api-key": "8b159d1f-7b81-4499-8cb2-ed3f80f25924" } }
        ).then(res => {
            dispatch({
                type: "GET_REGION_ID",
                years: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }
}

export function getValue(id, miles) {
    return dispatch => {
        axios.get(url + `valueByVehicleId?period=0&vehicletype=UsedCar&ucgvehicleid=${id}&region=6&mileage=${miles}`, 
        { headers: { "api-key": "8b159d1f-7b81-4499-8cb2-ed3f80f25924" } }
        ).then(res => {
            dispatch({
                type: "GET_VALUE",
                years: res.data
            })
        })
    }
}

export function getVehicleByVin(vin) {
    return dispatch => {
        axios.get(url + `vehiclesByVin?period=0&vehicletype=UsedCar&vin=${vin}`,
        { headers: { "api-key": "8b159d1f-7b81-4499-8cb2-ed3f80f25924" } }
        ).then(res => {
            dispatch({
                type: 'GET_VEHICLE_BY_VIN',
                years: res.data
            })
        })
    }
}

export function getValueByVin(vin, miles) {
    return dispatch => {
        axios.get(url + `defaultVehicleAndValuesByVin?period=0&vehicletype=UsedCar&vin=${vin}&region=6&mileage=${miles}`,
        { headers: { "api-key": "8b159d1f-7b81-4499-8cb2-ed3f80f25924" } }
        ).then(res => {
            dispatch({
                type: "GET_VALUE_BY_VIN",
                years: res.data
            })
        })
    }
}

export default function reducer(years = [], action) {
    switch(action.type) {
        case "GET_YEARS":
            return action.years
        case "GET_MAKES":
            return action.years
        case "GET_MODELS":
            return action.years
        case "GET_BODIES":
            return action.years
        case "GET_REGION_ID":
            return action.years
        case "GET_VALUE":
            return action.years
        case "GET_VALUE_BY_VIN":
            return action.years
        default:
            return years
    }
}