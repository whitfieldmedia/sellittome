import { combineReducers } from 'redux';
import blackValue from './BlackValue';
import years from './Year';
import form from './Form';

const rootReducer = combineReducers({
    blackValue,
    form,
    years
})

export default rootReducer;