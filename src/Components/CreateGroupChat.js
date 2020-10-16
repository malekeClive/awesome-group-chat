import React, { useState } from 'react';
import axios from 'axios';
import { URL, PORT } from '../utils/url';

export default function CreateGroupChat() {
  const [ groupName, setGroupName ] = useState("");

  const onCreateNewGroup = (e) => {
    e.preventDefault();

    
    const form = {
      roomName: groupName,
    }

    axios.post(`${URL}:${PORT}/api/chat/create`, form)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err)
      });
  }

  return (
    <div className="shadow-lg w-1/2 h-64 my-12 mx-auto">
      <div className="p-12">
        <h3 className="text-gray-600 text-3xl mb-4">Group name</h3>
        <form onSubmit={onCreateNewGroup}>
          <div className="mb-3">
            <input 
              className="shadow w-full px-3 py-2 outline-none bg-gray-100"
              type="text" 
              value={groupName} 
              onChange={(e) => setGroupName(e.target.value)} />
          </div>
          <div>
            <input 
              className="float-right px-3 py-2 rounded cursor-pointer bg-blue-300 bg-transparent font-sans font-bold text-white"
              type="submit" 
              value="Create" />
          </div>
        </form>
      </div>
    </div>
  )
}
