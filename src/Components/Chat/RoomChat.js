import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { actionStoreChat } from '../../actions/actionChat';

import socket from '../../socket';
import ChatBubble from './ChatBubble';

export default function RoomChat({ currentRoom, chatList, setChat }) {
  const [ chatText, setChatText ] = useState("");
  const [ chatData, setChatData ] = useState([]);

  const user      = useSelector(store => store.user);

  const dispatch  = useDispatch();

  // useEffect(() => {
    // MASIH SALAH
    // console.log(chatList);
    // const chatListByRoomId = chatList.filter(chat => chat.roomId === roomId);
    // setChatData(chatListByRoomId);
  // }, [chatList])

  useEffect(() => {
    // emmiter(s)
    socket.emit('roomId', { roomId: currentRoom.roomId})

    const logMsg = (msg) => {
      console.log(msg);
    }
    
    const dispatchMsg = (msg) => {
      console.log("Asdsd", msg);
      // dispatch(actionStoreChat(msg))
    }

    // listener(s)
    socket.on('message', logMsg);
    socket.on('chat-message', dispatchMsg);

    return () => {
      socket.off('message', logMsg);
      socket.off('chat-message', dispatchMsg);
    }
  }, [dispatch, currentRoom]);

  // const closeChatRoom = () => {
  //   socket.emit('disconnect');
  //   props.history.push("/list");
  // }

  const onSendChat = () => {
    const data = {
      roomId: currentRoom.roomId,
      userId: user.userId, 
      // name: user.username, 
      description: chatText 
    }

    socket.emit('chat', data);
    setChat(prev => [...prev, data]);
    setChatText("");
  }

  return (
    <div className="overflow-hidden">
      {/* Top header */}
      <div className=" bg-gray-900 shadow-inner text-xl text-gray-600">
        <div className="flex flex-row items-center">
          <div className="h-10 mr-6 w-px rounded bg-gray-600"></div>
          <div>
            <h2 className="">{ currentRoom.roomName }</h2>
            <i className="text-sm">Room ID : { currentRoom.roomId }</i>
          </div>
        </div>
      </div>

      <div className="relative overflow-y-scroll">
        <div className="flex flex-col my-16 px-8 py-4">
          {
            chatList.map(( chat, idx ) => (
              <ChatBubble key={ idx } chat={ chat } />
            ))
          }
        </div>
      </div>

      {/* Bottom Chat */}
      <div className="fixed w-full bottom-0 flex flex-row items-center content-between bg-gray-900 px-8 py-4">
        <div className="sm:w-2/3 w-2/4 rounded-full bg-gray-800 p-4">
          <input 
            className="sm:w-2/3 w-2/4 focus:outline-none font-mono text-lg text-gray-400 bg-gray-800"
            type="text" 
            value={chatText} 
            onChange={e => setChatText(e.target.value)} />
        </div>
        <div className="fixed right-0 mx-6">
          <button className="font-mono font-bold text-xl text-gray-300 hover:text-purple-500" onClick={ onSendChat }>Send</button>
        </div>
      </div>
    </div>
  )
}