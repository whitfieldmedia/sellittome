export function addVin(vin) {
    return dispatch => {
        dispatch({
            type: "ADD_VIN",
            vin: vin
        })
    }
}
export function addYear(year) {
    return dispatch => {
        dispatch({
            type: "ADD_YEAR",
            year: year
        })
    }
}
export function addMake(make) {
    return dispatch => {
        dispatch({
            type: "ADD_MAKE",
            make: make
        })
    }
}
export function addModel(model) {
    return dispatch => {
        dispatch({
            type: "ADD_MODEL",
            model: model
        })
    }
}
export function addUvc(uvc) {
    return dispatch => {
        dispatch({
            type: "ADD_UVC",
            uvc: uvc
        })
    }
}
export function addMiles (miles) {
    return dispatch => {
        dispatch({
            type: 'ADD_MILES',
            miles: miles
        })
    }
}
export function addCondition (condition) {
    return dispatch => {
        dispatch({
            type: 'ADD_CONDITION',
            condition: condition
        })
    }
}
export function addZip (zip) {
    return dispatch => {
        dispatch({
            type: 'ADD_ZIP',
            zip: zip
        })
    }
}
export function addFiles (files) {
    return dispatch => {
        dispatch({
            type: 'ADD_FILES',
            files: files
        })
    }
}
export function addIndex (index) {
    return dispatch => {
        dispatch({
            type: 'ADD_INDEX',
            index: index
        })
    }
}
export function showError(value) {
    return dispatch => {
        dispatch({
            type: 'SHOW_ERROR',
            error: value
        })
    }
}

export function addSeries(series) {
    return dispatch => {
        dispatch({
            type: "ADD_SERIES",
            series: series
        })
    }
}
export function addStyle(style) {
    return dispatch => {
        dispatch({
            type: "ADD_STYLE",
            style: style
        })
    }
}
export function addLowPrice(lowPrice) {
    return dispatch => {
        dispatch({
            type: "ADD_LOW_PRICE",
            lowPrice: lowPrice
        })
    }
}

export function addHighPrice(highPrice) {
    return dispatch => {
        dispatch({
            type: "ADD_HIGH_PRICE",
            highPrice: highPrice
        })
    }
}
export function addName(name) {
    return dispatch => {
        dispatch({
            type: "ADD_NAME",
            name: name
        })
    }
}
export function addEmail(email) {
    return dispatch => {
        dispatch({
            type: "ADD_EMAIL",
            email: email
        })
    }
}
export function addPhone(phone) {
    return dispatch => {
        dispatch({
            type: "ADD_PHONE",
            phone: phone
        })
    }
}
export function emailSent(value) {
    return dispatch => {
        dispatch({
            type: "EMAIL_SENT",
            sent: value
        })
    }
}
export function addVehicleId(id) {
    return dispatch => {
        dispatch({
            type: "ADD_VEHICLE_ID",
            vehicleId: id
        })
    }
}
const initialForm = {
    vin: '',
    year: '',
    make: '',
    model: '',
    series: '',
    style: '',
    uvc: '',
    vehicleId: '',
    miles: '',
    condition: '',
    zip: '',
    files: [],
    index: 1,
    error: false,
    lowPrice: '',
    highPrice: '',
    name: '',
    email: '',
    phone: '',
    sent: false
}

export function clearForm() {
    return dispatch => {
        dispatch({ type: 'CLEAR_FORM' })
    }
}

export default function reducer(state = initialForm, action) {
    switch(action.type) {
        case "ADD_VIN":
            return {
                ...state,
                vin: action.vin
            }
        case "ADD_YEAR":
            return {
                ...state,
                year: action.year
            }
        case "ADD_MAKE":
            return {
                ...state,
                make: action.make
            }
        case "ADD_MODEL":
            return {
                ...state,
                model: action.model
            }
        case "ADD_UVC":
            return {
                ...state,
                uvc: action.uvc
            }
        case "ADD_MILES":
            return {
                ...state,
                miles: action.miles
            }
        case "ADD_CONDITION":
            return {
                ...state,
                condition: action.condition
            }
        case "ADD_ZIP":
            return {
                ...state,
                zip: action.zip
            }
        case "ADD_FILES":
            return {
                ...state,
                files: action.files
            }
        case "ADD_INDEX": 
            return {
                ...state,
                index: action.index
            }
        case "SHOW_ERROR":
            return {
                ...state,
                error: action.error
            }
        case "ADD_LOW_PRICE":
            return {
                ...state,
                lowPrice: action.lowPrice
            }
        case "ADD_HIGH_PRICE":
            return {
                ...state,
                highPrice: action.highPrice
            }
        case "ADD_SERIES":
            return {
                ...state,
                series: action.series
            }
        case "ADD_STYLE":
            return {
                ...state,
                style: action.style
            }
        case "ADD_NAME": 
            return {
                ...state,
                name: action.name
            }
        case "ADD_EMAIL":
            return {
                ...state,
                email: action.email
            }
        case "ADD_PHONE":
            return {
                ...state,
                phone: action.phone
            }
        case "EMAIL_SENT": 
            return {
                ...state,
                sent: action.sent
            }
        case "ADD_VEHICLE_ID":
            return {
                ...state,
                vehicleId: action.vehicleId
            }
        case "CLEAR_FORM":
            return initialForm
        default:
            return state
    }
}