import React, { useEffect } from 'react';
import axios from 'axios';
import { URL, PORT } from '../utils/url';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomByUser } from '../actions/actionRooms';
import { getRoomId } from '../actions/actionRoomId';
import { useHistory } from 'react-router-dom';

export default function GroupChatList() {
  const roomList  = useSelector((store) => store.rooms);
  const dispatch  = useDispatch();
  const history   = useHistory();

  useEffect(() => {
    try {
      axios(`${URL}:${PORT}/api/chat/getAll`)
        .then(response => {
          dispatch(getAllRoomByUser(response.data.data));
        })
    } catch (error) {
      console.log(error);
    }
  }, []);

  const chatRoomHandler = (groupId=null) => {
    if (groupId === null) {
      console.log("Oops.. room not found");
    } else {
      const getRoomChat = roomList.find(room => room.roomId === groupId);
      dispatch(getRoomId(getRoomChat.roomId));
      // socket.on('message', (res) => {
      //   dispatch(getChat(res));
      // });
      history.push("/room-chat");
    }
  }

  const rooms = () => {
    if (roomList.length !== 0) {
      return (
        <div className="grid lg:grid-cols-4">
          {
            roomList.map(room => (
              <Room key={ room.roomId } room={room} chatRoomHandler={chatRoomHandler} />
            ))
          }
        </div>
      )
    } else {
      return <div className="w-1/2 my-8 mx-auto text-center">Empty group</div>
    }
  }

  return (
    <div>
      { rooms() }
    </div>
  )
}

const Room = ({ room, chatRoomHandler }) => {
  return (
    <div 
      className="flex flex-col rounded m-4 shadow-md cursor-pointer hover:bg-gray-300" 
      onClick={() => chatRoomHandler(room.roomId)}>
      <div className="text-lg p-4">
        <h2 className=" text-lg sm:text-2xl">
          {room.roomName}
        </h2>
      </div>
      <div className="p-4">
        <p className="text-xs sm:text-sm">
          asdasdkjasldkjalkzncxznxcnaq...
        </p>
      </div>
    </div>
  )
}