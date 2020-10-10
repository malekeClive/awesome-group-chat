export const ROOMS = 'ROOMS';

export function getAllRoomByUser(newRooms) {
  return {
    type: ROOMS,
    newRooms: newRooms
  }
}