import React from 'react';
import Auth from './auth';

import joinImg from '../Images/network.png';
import createImg from '../Images/magic-wand.png';
import listImg from '../Images/checklist.png';
import logoutImg from '../Images/exit.png';

import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Nav() {
  const listStyling = `mr-6 hover:text-gray-300`;
  const history = useHistory();
  const user    = useSelector(store => store.user);

  const onLogout = () => {
    Auth.logout(() => {
      history.replace("/login")
    });
  }

  return (
    <div className="w-screen flex items-center justify-between p-2 font-sans text-xl bg-gray-900 shadow-inner text-gray-600">
      <nav className="ml-6">
        <ul className="flex items-center">
          <li className={listStyling}>
            <Link to="/"><img className="w-6" src={ joinImg } alt="join-img"></img></Link>
          </li>
          <li className="h-6 mr-6 bg-gray-600 w-px rounded"></li>
          <li className={listStyling}>
            <Link to="/create"><img className="w-6" src={ createImg } alt="create-img"></img></Link>
          </li>
          <li className="h-6 mr-6 bg-gray-600 w-px rounded"></li>
          <li className={listStyling}>
            <Link to="/list"><img className="w-6" src={ listImg } alt="list-img"></img></Link>
          </li>
          <li className="h-6 mr-6 bg-gray-600 w-px rounded"></li>
          <li className={listStyling}>
            <button className="p-2" onClick={onLogout}><img className="w-6" src={ logoutImg } alt="logout-img"></img></button>
          </li>
        </ul>      
      </nav>
      <h2 className="inline-block mr-8">
        { user.username }
      </h2>
    </div>
  )
}
