import { combineReducers } from 'redux';
import configReducer from './configSlice';

export default combineReducers({
  config: configReducer,
});
