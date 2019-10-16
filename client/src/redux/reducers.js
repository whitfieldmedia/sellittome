import { combineReducers } from 'redux';
import blackValue from './BlackValue';
import form from './Form';
import auth from './auth';
import vehicleDatabase from './vehicleDatabase';

const rootReducer = combineReducers({
    blackValue,
    form,
    vehicleDatabase,
    auth
})

export default rootReducer;