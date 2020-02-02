import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'
import hp from './hp'
import fight from './fight'

export default combineReducers({
    alert,
    auth,
    hp,
    fight,
});