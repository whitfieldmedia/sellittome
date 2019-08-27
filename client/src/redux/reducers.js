import { combineReducers } from 'redux';
import blackVin from './BlackVin';
import blackCar from './BlackCar';
import blackModels from './BlackModels';
import blackTrims from './BlackTrims';
import blackValue from './BlackValue';

const rootReducer = combineReducers({
    blackVin,
    blackCar,
    blackModels,
    blackTrims,
    blackValue
})

export default rootReducer;