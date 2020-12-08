import React, {useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { actionNotification } from '../actions/actionNotification';

export default function Notification() {
  const dispatch = useDispatch();
  const notifResponse = useSelector(store => store.notifResponse);
  
  return (
    <Fragment>
      {
        notifResponse ? 
          <div className="w-full">
            <div className=" absolute bg-gray-900 opacity-75 w-full h-full"></div>
            <div className="absolute w-6/12 h-56 mx-auto my-64 left-0 right-0 p-4 rounded text-white bg-gray-900 border border-gray-300">
              <button onClick={() => dispatch(actionNotification({ isShowing: false, msg: "" }))}>
                Close
              </button>
            </div>
          </div>
        :
        null
      }
    </Fragment>
  )
}
