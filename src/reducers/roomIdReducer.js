import { ROOMID } from '../actions/actionRoomId';

function roomIdReducer(roomId=0, action) {
  if (action.type === ROOMID) return action.roomId;
  return roomId;
}

export default roomIdReducer;