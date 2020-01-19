import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'
import fight from './fight'

export default combineReducers({
    alert,
    auth,
    fight,
});