import { CHAT, CHAT_LIST } from '../actions/actionChat';

function chatReducer(chats=[], action) {
  switch (action.type) {
    case CHAT_LIST:
      return action.payload;
    case CHAT:
      return [...chats, action.payload];
    default:
      return chats;
  }
}

export default chatReducer;