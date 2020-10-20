import userReducer from './userReducer';
import roomsReducer from './roomsReducer';
import chatReducer from './chatReducer';
import roomIdReducer from './roomIdReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  user: userReducer,
  roomId: roomIdReducer,
  rooms: roomsReducer,
  chats: chatReducer,
})

export default reducers;