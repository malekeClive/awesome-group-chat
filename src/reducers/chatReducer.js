import { CHAT } from '../actions/actionChat';

function chatReducer(chats=[], action) {
  switch (action.type) {
    case CHAT:
      console.log(action.chat);
      return [
        ...chats,
        { ...action.chat }
      ];
    default:
      return chats;
  }
}

export default chatReducer;