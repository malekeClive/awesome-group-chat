import React from 'react'
import Auth from './auth';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Nav({ setIsAuth }) {
  const listStyling = `mr-6 hover:text-gray-300`;
  const history = useHistory();
  const user    = useSelector(store => store.user);

  const onLogout = () => {
    Auth.logout(() => {
      setIsAuth(false);
      history.replace("/login")
    });
  }

  return (
    <div className="bg-gray-900 shadow-inner p-4 font-sans text-xl text-gray-600 w-full flex items-center justify-between">
      <nav className="ml-6">
        <ul className="flex items-center">
          <li className={listStyling}>
            <Link to="/">Join room</Link>
          </li>
          <li className={listStyling}>
            <Link to="/create">Create new room</Link>
          </li>
          <li className={listStyling}>
            <Link to="/list">Chat list</Link>
          </li>
          <li className="h-10 mr-6 bg-gray-600 w-px rounded">
          </li>
          <li className="mr-6">
            <button className="rounded hover:text-red-400 p-2" onClick={onLogout}>Logout</button>
          </li>
        </ul>      
      </nav>
      <h2 className="inline-block mr-8">
        { user.username }
      </h2>
    </div>
  )
}
