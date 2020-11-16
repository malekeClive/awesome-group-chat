import React, { Fragment, useState } from 'react';
import useInputField from './CustomHooks/InputField';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { URL, PORT } from '../utils/url';
import ButtonSubmit from '../helpers/ButtonSubmit';

import { actionNotification } from '../actions/actionNotification';
import withForm from './HOC/WithForm';

function Create() {
  const [ groupName, setGroupName ] = useInputField("");
  const [ isLoading, setIsLoading ] = useState(false);

  const dispatch  = useDispatch();

  const onCreateNewGroup = (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    const form = { roomName: groupName }
    try {
      axios.post(`${URL}:${PORT}/api/room/create`, form)
      .then(res => {
        setIsLoading(false);
        dispatch(actionNotification({ isShowing: true, msg: "asdsad" + res }));
        setGroupName("");
      }).catch(err => {
        setIsLoading(false);
        dispatch(actionNotification({ isShowing: true, msg: "asdsad" + err }));
        console.log(err)
      });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default withForm("Room Name")(Create);