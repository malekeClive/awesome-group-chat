import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { actionStoreChat } from '../actions/actionChat';
import auth from './auth';

import socket from '../socket';
import ChatBubble from './ChatBubble';

export default function RoomChat(props) {
  const [ chatText, setChatText ] = useState("");
  const [ room, setRoom ] = useState({});

  const rooms     = useSelector((store) => store.rooms);
  const chatList  = useSelector((store) => store.chats);
  const roomId    = useSelector((store) => store.roomId);

  const dispatch  = useDispatch();

  const chatListByRoomId = chatList.filter(chat => chat.roomId === roomId);


  useEffect(() => {
    const room = rooms.find(room => room.roomId === roomId);
    setRoom(room);
  }, [rooms, roomId]);

  useEffect(() => {
    // emmiter(s)
    socket.emit('roomId', { roomId: roomId})

    const logMsg = (msg) => {
      console.log(msg);
    }
    
    const dispatchMsg = (msg) => {
      dispatch(actionStoreChat(msg))
    }

    // listener(s)
    socket.on('message', logMsg);
    socket.on('chat-message', dispatchMsg);

    return () => {
      socket.off('message', logMsg);
      socket.off('chat-message', dispatchMsg);
    }
  }, [])


  const closeChatRoom = () => {
    socket.emit('disconnect');
    props.history.push("/list");
  }

  const onSendChat = () => {
    socket.emit('chat', { 
      roomId: roomId,
      uId: auth.user.userId, 
      name: auth.user.username, 
      msg: chatText 
    });

    setChatText("");
  }

  return (
    <div className="overflow-hidden">
      <div className="relative overflow-y-scroll">
        <div className="flex flex-col my-16 px-8 py-4">
          {
            chatListByRoomId.map(( chat, idx ) => (
              <ChatBubble key={ idx } chat={ chat } />
            ))
          }
        </div>
      </div>

      {/* Top header */}
      <div className="fixed inset-x-0 top-0 p-4 shadow bg-white text-xl text-gray-700">
        <div className="flex flex-row items-center">
          <div>
            <button className="px-4 py-2 mr-4 hover:text-red-400 outline-none" onClick={() => closeChatRoom()}>back</button>
          </div>
          <div className="h-10 mr-6 w-1 rounded bg-gray-500"></div>
          <div>
            <h2 className="">{ room ? room.roomName : null }</h2>
          </div>
        </div>
      </div>

      {/* Bottom Chat */}
      <div className="fixed flex flex-row items-center content-between inset-x-0 bottom-0 bg-gray-300 px-8 py-4">
        <div className="rounded-full bg-white p-4 w-full ">
          <input 
            className="w-full focus:outline-none font-mono text-lg text-gray-800"
            type="text" 
            value={chatText} 
            onChange={e => setChatText(e.target.value)} />
        </div>
        <div className="mx-6">
          <button className="font-mono font-bold text-xl text-gray-800" onClick={ onSendChat }>Send</button>
        </div>
      </div>
    </div>
  )
}