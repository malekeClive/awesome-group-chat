import { ROOMS } from '../actions/actionRooms';

function roomsReducer(state=[], action) {
  switch (action.type) {
    case ROOMS:
      return action.payload;
    default:
      return state;
  }
}

export default roomsReducer;