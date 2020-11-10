import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomId } from '../../actions/actionRoomId';
import { useHistory } from 'react-router-dom';
import Room from './Room';

export default function Rooms() {
  const history   = useHistory();
  const roomList  = useSelector((store) => store.rooms);
  const dispatch  = useDispatch();

  const chatRoomHandler = (groupId=null) => {
    if (groupId === null) {
      console.log("Oops.. room not found");
    } else {
      const getRoomChat = roomList.find(room => room.roomId === groupId);
      dispatch(getRoomId(getRoomChat.roomId));
      history.push("/room-chat");
    }
  }

  return (
    <div className="grid lg:grid-cols-4">
      {
        roomList.map(room => (
          <Room key={ room.roomId } room={room} chatRoomHandler={chatRoomHandler} />
        ))
      }
    </div>
  )
}
