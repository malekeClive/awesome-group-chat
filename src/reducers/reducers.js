import userReducer from './userReducer';
import roomsReducer from './roomsReducer';
import chatReducer from './chatReducer';
import notificationReducer from './notificationReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  user: userReducer,
  rooms: roomsReducer,
  chats: chatReducer,
  notificationResponse: notificationReducer,
})

export default reducers;