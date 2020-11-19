import React from 'react';
import { useSelector } from 'react-redux';

export default function Room({ room, chatRoomHandler }) {
  const chatList  = useSelector((store) => store.chats);
  
  return (
    <div 
      className="flex flex-col rounded cursor-pointer hover:bg-gray-800 text-gray-400" 
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