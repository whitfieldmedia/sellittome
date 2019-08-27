import axios from 'axios';

const url = "https://service.blackbookcloud.com/UsedCarWs/UsedCarWs/"

export function getBlackMakes(year) {
    return dispatch => {
        axios.get(url + 'Drilldown/' + encodeURIComponent("ALL") + '/' + encodeURIComponent(year) + '?drilldeep=' + encodeURIComponent('false') + '&getclass=' + encodeURIComponent("false") + "&customerid=" + encodeURIComponent('false')).then(res => {
            dispatch({
                type: 'GET_BLACK_MAKES',
                blackCar: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
}


export default function reducer(blackCar = [], action) {
    switch(action.type) {
        case "GET_BLACK_MAKES":
            return action.blackCar
        default:
            return blackCar
    }
}