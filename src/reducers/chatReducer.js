import { CHAT } from '../actions/actionChat';

function chatReducer(chats=[], action) {
  switch (action.type) {
    case CHAT:
      return action.payload;
    default:
      return chats;
  }
}

export default chatReducer;