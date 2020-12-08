import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL, PORT } from '../../utils/url';
import { getAllRoomByUser } from '../../actions/actionRooms';
import { actionStoreChatList } from '../../actions/actionChat';
import { useDispatch, useSelector } from 'react-redux';
import RoomChat from '../Chat/RoomChat';
import Room from '../Room/Room';


function GroupChatList() {
  const dispatch  = useDispatch();
  const roomList  = useSelector((store) => store.rooms);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    try {
      axios(`${URL}:${PORT}/api/room/getAll`)
        .then(response => {
          dispatch(getAllRoomByUser(response.data.data));
        });
    } catch (error) {
      console.log(error);
    }
  }, [ dispatch ]);

  useEffect(() => {
    try {
      axios(`${URL}:${PORT}/api/chat/getChat`)
        .then(response => {
          dispatch(actionStoreChatList(response.data.data))
        });
    } catch (error) {
      console.log(error);
    }
  }, [ dispatch ])

  const chatRoomHandler = (groupId=null) => {
    try {
      if (groupId === null) {
        console.log("Oops.. room not found");
      } else {
        const getRoomChat = roomList.find(room => room.roomId === groupId);
        setCurrentRoom(getRoomChat);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="relative h-screen w-full flex flex-row">
      <div className="absolute w-1/5 bottom-0 top-0 left-0 flex flex-col bg-gray-900 overflow-y-auto">
        {
          roomList.map(room => (
            <Room key={ room.roomId } room={room} chatRoomHandler={chatRoomHandler} />
          ))
        }
      </div>
      {
        currentRoom !== null ?
        <RoomChat currentRoom={currentRoom} />  
        :
        <EmptyChat />
      }
    </div>
  )
}

const EmptyChat = () => {
  return (
    <div className="absolute w-4/5 right-0 bottom-0 top-0 text-white bg-red-400">
      <p>Chat Group</p>
    </div>
  )
}
export default GroupChatList;