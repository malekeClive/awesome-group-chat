import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { URL, PORT } from '../utils/url';
import ButtonSubmit from '../helpers/ButtonSubmit';

import { actionNotification } from '../actions/actionNotification';

export default function Create() {
  const [ groupName, setGroupName ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const dispatch  = useDispatch();

  const onCreateNewGroup = (e) => {
    e.preventDefault();
    
    if (isLoading) return;
    setIsLoading(true);

    const form = { roomName: groupName }

    axios.post(`${URL}:${PORT}/api/chat/create`, form)
    .then(res => {
      setIsLoading(false);
      dispatch(actionNotification({ isShowing: true, msg: "asdsad" + res }));
      setGroupName("");
    }).catch(err => {
      setIsLoading(false);
      dispatch(actionNotification({ isShowing: true, msg: "asdsad" + err }));
      console.log(err)
    });
  }

  return (
    <div className="bg-gray-900 shadow-inner rounded w-1/2 h-64 my-12 mx-auto">
      <div className="p-12">
        <h3 className="text-gray-600 text-3xl mb-4">Room Name</h3>
        <form onSubmit={ onCreateNewGroup }>
          <div className="mb-3">
            <input 
              className="bg-gray-700 w-full px-3 py-2 outline-none rounded text-gray-400"
              type="text" 
              value={ groupName } 
              onChange={(e) => setGroupName(e.target.value)} />
          </div>
          <div>
            <ButtonSubmit submitHandler={ onCreateNewGroup } loading={ isLoading } label="Create" />
          </div>
        </form>
      </div>
    </div>
  )
}
