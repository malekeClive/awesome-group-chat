import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import Auth from './auth';

export default function Nav({ setIsAuth }) {
  const listStyling = `mr-6 hover:text-blue-300`;
  const history = useHistory();

  const onLogout = () => {
    Auth.logout(() => {
      setIsAuth(false);
      history.replace("/login")
    });
  }

  return (
    <div className="shadow p-4 font-sans text-xl text-gray-700">
      <nav>
        <ul className="flex items-center">
          <li className={listStyling}>
            <Link to="/">Home</Link>
          </li>
          <li className={listStyling}>
            <Link to="/create">Create new group</Link>
          </li>
          <li className={listStyling}>
            <Link to="/list">Chat list</Link>
          </li>
          <li className="h-10 mr-6 bg-gray-500 w-1 rounded">
          </li>
          <li className="mr-6">
            <button className="rounded hover:bg-red-300 hover:text-white p-2" onClick={onLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
