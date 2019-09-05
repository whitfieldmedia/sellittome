import { combineReducers } from 'redux';
import blackValue from './BlackValue';
import form from './Form';

const rootReducer = combineReducers({
    blackValue,
    form
})

export default rootReducer;