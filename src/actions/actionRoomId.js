export const ROOMID = 'ROOMID';

export function getRoomId(id) {
  return {
    type: ROOMID,
    payload: id,
  }
}