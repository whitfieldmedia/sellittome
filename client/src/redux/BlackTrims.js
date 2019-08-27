import axios from 'axios';

const url = "https://service.blackbookcloud.com/UsedCarWs/UsedCarWs/Drilldown/"

export function getBlackTrims(year, make, model) {
    return dispatch => {
        axios.get(url + encodeURIComponent("ALL") + '/' + encodeURIComponent(year) + '/' + encodeURIComponent(make) + '?model=' + encodeURIComponent(model) + '&drilldeep=' + encodeURIComponent('false') + '&getclass=' + encodeURIComponent("false") + "&customerid=" + encodeURIComponent('test')).then(res => {
            console.log(res.data)
            dispatch({
                type: "GET_BLACK_TRIMS",
                blackTrims: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export default function reducer(blackTrims = [], action) {
    switch(action.type) {
        case "GET_BLACK_TRIMS":
            return action.blackTrims
        default:
            return blackTrims
    }
}