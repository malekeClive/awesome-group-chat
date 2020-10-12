import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { actionStoreChat } from '../actions/actionChat';
import auth from './auth';

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
  }

  return (
    <div className="overflow-hidden">
      <div className="relative overflow-y-scroll">
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

const ChatBubble = ({ chat }) => {
  return (
    <div className="m-1 text-gray-800">
      <div className={`shadow-md rounded-lg p-4 float-${chat.uId !== auth.userId ? 'left' : 'right'}`}>
        <div className="border-b-2">
          <div>
            <h4 className="font-mono text-xl">
              { chat.name }
            </h4>
          </div>
        </div>

        <div className="mt-2">
          <p className="font-mono text-lg">
            { chat.msg }
          </p>
        </div>
      </div>
    </div>
  )
}