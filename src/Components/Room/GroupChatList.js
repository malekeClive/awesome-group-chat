import React, { useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { URL, PORT } from '../../utils/url';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomByUser } from '../../actions/actionRooms';
import { getRoomId } from '../../actions/actionRoomId';
import { useHistory } from 'react-router-dom';

import Loading from '../../helpers/LoadingComponent';

export default function GroupChatList() {
  const Rooms = lazy(() => import('./Rooms'))

  const roomList  = useSelector((store) => store.rooms);
  const chatList  = useSelector((store) => store.chats);
  const dispatch  = useDispatch();
  const history   = useHistory();

  useEffect(() => {
    try {
      axios(`${URL}:${PORT}/api/chat/getAll`)
        .then(response => {
          dispatch(getAllRoomByUser(response.data.data));
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    <div>
      <Suspense fallback={ <Loading /> }>
        <Rooms roomList={ roomList } chatList={ chatList } chatRoomHandler={ chatRoomHandler } />
      </Suspense>
    </div>
  )
}