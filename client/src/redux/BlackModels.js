import axios from 'axios';

const url = "https://service.blackbookcloud.com/UsedCarWs/UsedCarWs/Drilldown/"

export function getBlackModels(year, make) {
    return dispatch => {
        axios.get(url + encodeURIComponent("ALL") + '/' + encodeURIComponent(year) + '/' + encodeURIComponent(make) + '?drilldeep=' + encodeURIComponent('false') + '&getclass=' + encodeURIComponent("false") + "&customerid=" + encodeURIComponent('false')).then(res => {
            console.log(res.data)
            dispatch({
                type: 'GET_BLACK_MODELS',
                blackModels: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}

export default function reducer(blackModels = [], action) {
    switch(action.type) {
        case "GET_BLACK_MODELS":
            return action.blackModels
        default:
            return blackModels
    }
}