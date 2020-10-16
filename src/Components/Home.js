import React, { useState } from 'react';

export default function Home() {
  const [ roomId, setRoomId ] = useState('');

  const findRoom = (e) => {
    e.preventDefault();

    console.log("Asda");
  }

  return (
    <div className="shadow-lg w-1/2 h-64 my-12 mx-auto">
      <div className="p-12">
        <h3 className="text-gray-600 text-3xl mb-4">Join Room</h3>
        <form onSubmit={findRoom}>
          <div className="mb-3">
            <input 
              className="shadow w-full px-3 py-2 outline-none bg-gray-100"
              type="text" 
              value={roomId} 
              onChange={(e) => setRoomId(e.target.value)} />
          </div>
          <div>
            <input 
              className="float-right px-3 py-2 rounded cursor-pointer bg-blue-300 bg-transparent font-sans font-bold text-white"
              type="submit" 
              value="Join" />
          </div>
        </form>
      </div>
    </div>
  )
}
