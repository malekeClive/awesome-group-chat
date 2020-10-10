import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { actionStoreChat } from '../actions/actionChat';

import socket from '../socket';

export default function RoomChat(props) {
  const [ chatText, setChatText ] = useState("");
  const [ room, setRoom ] = useState({});

  const rooms     = useSelector((store) => store.rooms);
  const chatList  = useSelector((store) => store.chats);
  const roomId    = useSelector((store) => store.roomId);

  const dispatch = useDispatch();

  useEffect(() => {
    const room = rooms.find(room => room.roomId === roomId);
    setRoom(room);
  }, [rooms, roomId]);

  useEffect(() => {
    socket.emit('roomId', { roomId: roomId})
    socket.on('message', message => {
      console.log(message);
    });

    socket.on('chat-message', message => {
      console.log("==========", message);
      dispatch(actionStoreChat(message))
    });
  }, [])


  const closeChatRoom = () => {
    socket.emit('disconnect');
    props.history.push("/list");
  }

  const onSendChat = () => {
    socket.emit('chat', { roomId: roomId, name: "clive", msg: chatText });
  }

  return (
    <div className="overflow-hidden">
      <div className="relative -right-30 overflow-y-scroll">
        <div className="flex flex-col my-16 px-8 py-4">
          {
            chatList.map(( chat, idx ) => (
              <ChatBubble key={ idx } chat={ chat } />
            ))
          }
        </div>
      </div>

      {/* Top header */}
      <div className="fixed inset-x-0 top-0">
        <div className="flex flex-row items-center bg-gray-200">
          <div>
            <button className="px-8 py-4 bg-gray-300 mr-4 hover:bg-gray-400" onClick={() => closeChatRoom()}>Back</button>
          </div>
          <div>
            <h2 className="text-gray-700">{ room ? room.roomName : null }</h2>
          </div>
        </div>
      </div>

      {/* Bottom Chat */}
      <div className="fixed inset-x-0 bottom-0 bg-gray-300 px-8 py-4">
        <div className="rounded-full bg-white p-4">
          <input 
            className="w-full focus:outline-none"
            type="text" 
            value={chatText} 
            onChange={e => setChatText(e.target.value)} />
        </div>
        <div>
          <button onClick={ onSendChat }>Send</button>
        </div>
      </div>
    </div>
  )
}

const ChatBubble = ({ chat }) => {
  return (
    <div className="m-1">
      <div className={`rounded-lg p-2 float-${false ? 'left' : 'right'} border border-black w-1/2`}>
        <div className="bg-gray-500">
          <div className="p-2">
            <h4>
              {chat.name}
            </h4>
          </div>
        </div>

        <div className="p-2 bg-gray-600">
          {chat.msg}
        </div>
      </div>
    </div>
  )
}