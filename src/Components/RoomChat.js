import React, { useState } from 'react';

export default function RoomChat({ closeChatRoom, room }) {
  const [ chatText, setChatText ] = useState("");
  const [ chats, setChats ] = useState([
    {
      isMe: true,
      name: "clive",
      msg: "y",
    },
    {
      isMe: false,
      name: "pevita",
      msg: "hallo ganteng "
    },
  ]);

  return (
    <div>
      <div className="flex flex-row items-center bg-gray-200">
        <div>
          <button className="m-2 px-4 py-2 bg-blue-300" onClick={() => closeChatRoom()}>&lt;</button>
        </div>
        <div>
          <h2>{room.groupName}</h2>
        </div>
      </div>

      <div className="flex flex-col m-8">
        {
          chats.map((chat, idx) => {
            if (chat.isMe) {
              return (
                <div className="relative mt-4">
                  <div className="left-0 p-4 w-1/2 bg-blue-300">
                    <div className="mb-4">
                      {chat.name}
                    </div>
                    <div>
                      {chat.msg}
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div className="relative mt-4">
                  <div className="rounded-full absolute p-4 w-1/2 right-0 bg-gray-300">
                    <div className="mb-4">
                      {chat.name}
                    </div>
                    <div>
                      {chat.msg}
                    </div>
                  </div>
                </div>
              )
            }
          })
        }
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-gray-300 px-8 py-4">
        <div className="rounded-full bg-white p-4">
          <input 
            className="w-full focus:outline-none"
            type="text" 
            value={chatText} 
            onChange={e => setChatText(e.target.value)} />
        </div>
      </div>
    </div>
  )
}
