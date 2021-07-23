import { combineReducers } from 'redux';
import configReducer from './configSlice';
import authSlice from './authSlice';
import resourceReducer from './resourceSlice';
import mediaSlice from './mediaSlice';
import userSlice from './userSlice';

export default combineReducers({
  config: configReducer,
  auth: authSlice,
  resources: resourceReducer,
  media: mediaSlice,
  users: userSlice
});
