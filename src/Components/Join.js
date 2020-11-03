import React, { useState } from 'react';
import axios from 'axios';
import { URL, PORT } from '../utils/url';
import ButtonSubmit from '../helpers/ButtonSubmit';

export default function Join() {
  const [ roomId, setRoomId ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const findRoom = async (e) => {
    e.preventDefault();
    try {
      const sendData = await axios.post(`${URL}:${PORT}/api/chat/join`, {roomId: roomId});
      console.log(sendData.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="bg-gray-900 shadow-inner w-1/2 h-64 my-12 mx-auto">
      <div className="p-12">
        <h3 className="text-gray-600 text-3xl mb-4">Room ID</h3>
        <form onSubmit={findRoom}>
          <div className="mb-3">
            <input 
              className="bg-gray-700 w-full px-3 py-2 outline-none rounded text-gray-400"
              type="text" 
              value={roomId} 
              onChange={(e) => setRoomId(e.target.value)} />
          </div>
          <div>
            <ButtonSubmit submitHandler={ findRoom } loading={ isLoading } label="Join" />
          </div>
        </form>
      </div>
    </div>
  )
}
