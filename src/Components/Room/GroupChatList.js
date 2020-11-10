import React, { useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { URL, PORT } from '../../utils/url';
import { useDispatch } from 'react-redux';
import { getAllRoomByUser } from '../../actions/actionRooms';
import { actionStoreChat } from '../../actions/actionChat';

import Loading from '../../helpers/SkeletonComponent';

export default function GroupChatList() {
  const Rooms = lazy(() => import('./Rooms'))
  const dispatch  = useDispatch();

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
  }, [])

  return (
    <div>
      <Suspense fallback={ <Loading /> }>
        <Rooms />
      </Suspense>
    </div>
  )
}