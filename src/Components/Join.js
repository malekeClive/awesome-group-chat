import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { URL, PORT } from '../utils/url';
import ButtonSubmit from '../helpers/ButtonSubmit';
import withForm from './HOC/WithForm';

function Join() {
  const [ roomId, setRoomId ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const findRoom = async (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      const sendData = await axios.post(`${URL}:${PORT}/api/room/join`, {roomId: roomId});
      console.log(sendData.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  }

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default withForm("Room ID")(Join);