import { combineReducers } from 'redux';
import blackCar from './BlackCar';
import blackModels from './BlackModels';
import blackTrims from './BlackTrims';
import blackValue from './BlackValue';
import form from './Form';

const rootReducer = combineReducers({
    blackCar,
    blackModels,
    blackTrims,
    blackValue,
    form
})

export default rootReducer;