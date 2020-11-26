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
  const chatList  = useSelector(store => store.chats);
  
  const [chat, setChat] = useState(null);
  const [currentRoom, setCurrentRoom] = useState({});

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
          // store chat to redux store (not tested yet)
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
        const filterChat = chatList.filter(chat => chat.roomId === getRoomChat.roomId);
        setCurrentRoom(getRoomChat);
        setChat(filterChat);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex">
      <div className="md:w-2/6 overflow-y-scroll h-screen">
        {/* <div className="p-4 text-white">Search</div> */}
        <div className="flex flex-col bg-gray-900 ">
          {
            roomList.map(room => (
              <Room key={ room.roomId } room={room} chatRoomHandler={chatRoomHandler} />
            ))
          }
        </div>
      </div>

      <div className="w-full">
        {
          chat !== null ? <RoomChat currentRoom={currentRoom} chatList={chat} setChat={setChat} />  : null
        }
      </div>
    </div>
  )
}

export default GroupChatList;