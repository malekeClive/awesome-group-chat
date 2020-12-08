import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { actionStoreChat } from '../../actions/actionChat';
import socket from '../../socket';
import ChatBubble from './ChatBubble';

export default function RoomChat({ currentRoom }) {
  const [ chatText, setChatText ] = useState("");
  const user      = useSelector(store => store.user);
  const chatList  = useSelector(store => store.chats);
  const dispatch  = useDispatch();

  const [ filteredChat, setFilteredChat ] = useState([]);

  useEffect(() => {
    // emmiter(s)
    socket.emit('roomId', { roomId: currentRoom.roomId})

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
  }, [ dispatch, currentRoom ]);

  useEffect(() => {
    const filterChat = chatList.filter(chat => chat.roomId === currentRoom.roomId);
    setFilteredChat(filterChat);
  }, [ currentRoom ]);

  const onSendChat = () => {
    const data = {
      roomId: currentRoom.roomId,
      userId: user.userId, 
      username: user.username, 
      description: chatText 
    }
    console.log(data);

    socket.emit('chat', data);
    setFilteredChat(prev => [...prev, data]);
    setChatText("");
  }

  return (
    <div className="absolute right-0 top-0 bottom-0 w-4/5 flex flex-col">
      {/* Top header */}
      <div className="bg-gray-900 shadow-inner text-xl text-gray-600">
        <div className="flex flex-row items-center">
          <div className="h-10 mr-6 w-px rounded bg-gray-600"></div>
          <div>
            <h2 className="">{ currentRoom.roomName }</h2>
            <i className="text-sm">Room ID : { currentRoom.roomId }</i>
          </div>
        </div>
      </div>

      <div className="relative h-screen">
        <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-auto flex flex-col">
        {
          filteredChat.map(( chat, idx ) => (
            <ChatBubble key={ idx } chat={ chat } />
          ))
        }
        </div>
      </div>

      {/* Bottom Chat */}
      <div className="flex flex-row items-center justify-between px-8 py-4 bg-gray-900">
        <div className="flex-1 rounded-full bg-gray-800 p-4">
          <input 
            className="w-full focus:outline-none font-mono text-lg text-gray-400 bg-gray-800"
            type="text" 
            value={chatText} 
            onChange={e => setChatText(e.target.value)} />
        </div>
        <div className="mx-6">
          <button className="font-mono font-bold text-xl text-gray-300 hover:text-purple-500" onClick={ onSendChat }>Send</button>
        </div>
      </div>
    </div>
  )
}