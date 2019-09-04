import { combineReducers } from 'redux';
import blackCar from './BlackCar';
import blackModels from './BlackModels';
import blackTrims from './BlackTrims';
import blackValue from './BlackValue';
import years from './Year';
import form from './Form';

const rootReducer = combineReducers({
    blackCar,
    blackModels,
    blackTrims,
    blackValue,
    form,
    years
})

export default rootReducer;