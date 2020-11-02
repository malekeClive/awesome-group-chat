import React from 'react';
import Room from './Room';

export default function Rooms({ roomList, chatList, chatRoomHandler }) {
  return (
    <div className="grid lg:grid-cols-4">
      {
        roomList.map(room => (
          <Room key={ room.roomId } chatList={chatList} room={room} chatRoomHandler={chatRoomHandler} />
        ))
      }
    </div>
  )
}
