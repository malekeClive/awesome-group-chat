import notesReducer from './notesReducer';
import roomsReducer from './roomsReducer';
import chatReducer from './chatReducer';
import roomIdReducer from './roomIdReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  roomId: roomIdReducer,
  notes: notesReducer,
  rooms: roomsReducer,
  chats: chatReducer,
})

export default reducers;