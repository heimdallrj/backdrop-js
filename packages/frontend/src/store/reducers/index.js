import { combineReducers } from 'redux';
import configReducer from './configSlice';
import userReducer from './userSlice';

export default combineReducers({
  config: configReducer,
  user: userReducer,
});
