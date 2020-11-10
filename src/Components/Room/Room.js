import React from 'react';
import { useSelector } from 'react-redux';

export default function Room({ room, chatRoomHandler }) {
  const chatList  = useSelector((store) => store.chats);

  const getLastChat = (roomId) => {
    const filterMsg = chatList.filter(chat => chat.roomId === roomId);
    const latestMsg = filterMsg[ filterMsg.length - 1 ];
    return latestMsg;
  }
  
  return (
    <div 
      className="bg-gray-900 shadow-inner flex flex-col rounded m-4 cursor-pointer hover:bg-gray-800 text-gray-400" 
      onClick={() => chatRoomHandler(room.roomId)}>
      <div className="text-lg p-4">
        <h2 className=" text-lg sm:text-2xl">
          {room.roomName}
        </h2>
      </div>
      <div className="p-4">
        <p className="text-xs sm:text-sm">
          {/* asdasdkjasldkjalkzncxznxcnaq... */}
        </p>
      </div>
    </div>
  )
}