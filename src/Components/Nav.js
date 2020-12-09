import React, { useState, useEffect } from 'react';
import Auth from './auth';

import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Nav() {
  const listStyling = `mr-6 hover:text-gray-300`;
  const [ readWidth, setReadWidth ] = useState(0);
  const history = useHistory();
  const user    = useSelector(store => store.user);

  // read screen width
  useEffect(() => {
    const resize = () => {
      setReadWidth(window.innerWidth);
    }

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    }
  }, []);

  const onLogout = () => {
    Auth.logout(() => {
      history.replace("/login")
    });
  }

  return (
    <div>
      <div className="absolute bottom-0 right-0 bg-red-400">asd</div>
      {/* <div className="absolute bottom-0 sm:top-0 sm:static w-screen flex items-center justify-between p-2 font-sans text-xl bg-gray-900 shadow-inner text-gray-600">
        <nav className="ml-6">
          <ul className="flex items-center">
            <li className={listStyling}>
              <Link to="/">Join</Link>
            </li>
            <li className="h-6 mr-6 bg-gray-600 w-px rounded"></li>
            <li className={listStyling}>
              <Link to="/create">Create</Link>
            </li>
            <li className="h-6 mr-6 bg-gray-600 w-px rounded"></li>
            <li className={listStyling}>
              <Link to="/list">List</Link>
            </li>
            <li className="h-6 mr-6 bg-gray-600 w-px rounded"></li>
            <li className={listStyling}>
              <button className="p-2" onClick={onLogout}>Logout</button>
            </li>
          </ul>      
        </nav>
        <h2 className="inline-block mr-8">
          { user.username }
        </h2>
      </div> */}
    </div>
  )
}
