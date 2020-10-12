import { CHAT } from '../actions/actionChat';

function chatReducer(chats=[], action) {
  switch (action.type) {
    case CHAT:
      return [
        ...chats,
        { ...action.chat }
      ];
    default:
      return chats;
  }
}

export default chatReducer;