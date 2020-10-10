import React, { useState } from 'react';
import axios from 'axios';

export default function CreateGroupChat({ setChatList }) {
  const [ groupName, setGroupName ] = useState("");
    
  const onCreateNewGroup = (e) => {
    e.preventDefault();

    const form = {
      groupName: groupName,
      member: 10,
      roleId: 1
    }

    axios.post('http://localhost:5000/api/chat/create', form)
      .then(response => {
        console.log(response.data);
        setGroupName("");
      }).catch(err => {
        console.log(err);
      })
    
    // setChatList(newGroupList); // push to state
  }

  return (
    <div className="w-2/5 my-0 mx-auto">
      <div>
        <form onSubmit={onCreateNewGroup}>
          <div className="mt-4">
            <label className="block mb-2 text-gray-600 font-mono">
              <h3 className="text-2xl">Group name</h3>
            </label>
            <input className="w-full shadow rounded focus:outline-none focus:bg-gray-100 px-2 py-2" type="text" value={groupName} onChange={e => setGroupName(e.target.value)} />
          </div>

          <div className="block mt-4">
            <input className="cursor-pointer border hover:border-transparent hover:text-white hover:bg-blue-300 bg-transparent rounded px-4 py-1 text-gray-600 font-mono transition duration-300 ease-in-out" type="submit" value="Create" />
          </div>
        </form>
      </div>
    </div>
  )
}
