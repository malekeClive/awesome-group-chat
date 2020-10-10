import React, { useState } from 'react';
import axios from 'axios';

export default function CreateGroupChat() {
  const [ groupName, setGroupName ] = useState("");

  const onCreateNewGroup = (e) => {
    e.preventDefault();

    
    const form = {
      roomName: groupName,
    }

    axios.post('http://localhost:5000/api/chat/create', form)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err)
      });
  }

  return (
    <div className="w-2/5 my-0 mx-auto">
      <div>
        <form onSubmit={onCreateNewGroup}>
          <div className="mt-4">
            <label className="block">Group name</label>
            <input className="border border-gray-300 rounded focus:outline-none focus:bg-gray-100 mt-2 px-2 py-1" type="text" value={groupName} onChange={e => setGroupName(e.target.value)} />
          </div>
          <div className="block mt-4">
            <input className="cursor-pointer border border-none rounded bg-blue-300 hover:bg-blue-400 px-4 py-1 font-bold text-white" type="submit" value="Create" />
          </div>
        </form>
      </div>
    </div>
  )
}
