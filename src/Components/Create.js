import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL, PORT } from '../utils/url';
import Notification from '../helpers/Notification';
import Loading from '../helpers/Loading';

export default function Create() {
  const [ groupName, setGroupName ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const onCreateNewGroup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = {
      roomName: groupName,
    }

    setTimeout(() => {
      setIsLoading(false);
      setGroupName("");
    }, 1000)
    

    // axios.post(`${URL}:${PORT}/api/chat/create`, form)
    // .then(res => {
    //   setIsLoading(false);
    //   // <Notification />
    // }).catch(err => {
    //   setIsLoading(false);
    //   console.log(err)
    // });
  }

  return (
    <div className="bg-gray-900 shadow-inner rounded w-1/2 h-64 my-12 mx-auto">
      <div className="p-12">
        <h3 className="text-gray-600 text-3xl mb-4">Room Name</h3>
        <form onSubmit={onCreateNewGroup}>
          <div className="mb-3">
            <input 
              className="bg-gray-700 w-full px-3 py-2 outline-none rounded text-gray-400"
              type="text" 
              value={groupName} 
              onChange={(e) => setGroupName(e.target.value)} />
          </div>
          <div>
            <button 
              className="flex items-center float-right px-3 py-2 rounded cursor-pointer bg-purple-800 hover:bg-purple-900 bg-transparent font-sans text-gray-300"
              type="button"
              onClick={onCreateNewGroup}
            >
              { isLoading ? <Loading loading={ isLoading } /> : null }
              <p className="mx-auto">Create</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
