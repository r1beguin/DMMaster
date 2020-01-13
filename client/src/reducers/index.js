import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'
import hp from './hp'

export default combineReducers({
    alert,
    auth,
    hp,
}); 