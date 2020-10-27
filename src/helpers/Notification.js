import React, { useState, useEffect } from 'react';

export default function Notification({ status }) {
  const [ isShowed, setIsShowed ] = useStore(false);

  useEffect(() => {
    setIsShowed(status);
  }, [ status ]);

  return (
    <div className={`${isShowed} fixed bg-gray-800 w-screen h-screen`}>
      asd
    </div>
  )
}
