import { ROOMID } from '../actions/actionRoomId';

function roomIdReducer(roomId=null, action) {
  switch (action.type) {
    case ROOMID:
      return action.payload;
    default:
      return roomId;
  }
}

export default roomIdReducer;