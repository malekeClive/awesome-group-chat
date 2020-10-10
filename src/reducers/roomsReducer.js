import { ROOMS } from '../actions/actionRooms';

function roomsReducer(rooms=[], action) {
  switch (action.type) {
    case ROOMS:
      return [
        ...action.newRooms
      ]
    default:
      return rooms;
  }
}

export default roomsReducer;