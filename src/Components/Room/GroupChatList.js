import React, { useEffect, lazy } from 'react';
import axios from 'axios';
import { URL, PORT } from '../../utils/url';
import { getAllRoomByUser } from '../../actions/actionRooms';
import { actionStoreChat } from '../../actions/actionChat';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomId } from '../../actions/actionRoomId';
import { useHistory } from 'react-router-dom';
import Loader from '../HOC/Loader';


function GroupChatList() {
  const Room = lazy(() => import('./Room'))
  const dispatch  = useDispatch();
  const history   = useHistory();
  const roomList  = useSelector((store) => store.rooms);

  useEffect(() => {
    try {
      axios(`${URL}:${PORT}/api/room/getAll`)
        .then(response => {
          dispatch(getAllRoomByUser(response.data.data));
        });
    } catch (error) {
      console.log(error);
    }
  }, [ dispatch ]);

  useEffect(() => {
    try {
      axios(`${URL}:${PORT}/api/chat/getChat`)
        .then(response => {
          // store chat to redux store (not tested yet)
          dispatch(actionStoreChat(response.data.data))
        });
    } catch (error) {
      console.log(error);
    }
  }, [ dispatch ])

  const chatRoomHandler = (groupId=null) => {
    if (groupId === null) {
      console.log("Oops.. room not found");
    } else {
      const getRoomChat = roomList.find(room => room.roomId === groupId);
      dispatch(getRoomId(getRoomChat.roomId));
      history.push("/room-chat");
    }
  }

  return (
    <div className="grid lg:grid-cols-4">
      {
        roomList.map(room => (
          <Room key={ room.roomId } room={room} chatRoomHandler={chatRoomHandler} />
        ))
      }
    </div>
  )
}

export default Loader(GroupChatList);