import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import './App.css';
import './tailwind.output.css';

import axios from 'axios';

import Auth from './Components/AuthSingleton';
import ProtectedRoute from './Components/ProtectedRoute';
import UnprotectedRoute from './Components/UnprotectedRoute';

import Home from './Components/Home';
import CreateGroupChat from './Components/CreateGroupChat';
import GroupChatList from './Components/GroupChatList';
import Login from './Components/Login';
import Register from './Components/Register';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;

  console.log(config);
  return config;
});

function App() {
  const [ isAuth, setIsAuth ] = useState(Auth.isAuthenticated());
  const [ chatList, setChatList ] = useState([]);

  return (
    <Router>
      { isAuth ?
        <Nav setIsAuth={ setIsAuth } />
      :
        null
      }

      <Switch>
        <UnprotectedRoute 
          path="/login" 
          render={ props => <Login {...props} setIsAuth={setIsAuth} /> } 
        />
        <UnprotectedRoute 
          path="/register" 
          render={ props => <Register {...props} /> } 
        />
        <ProtectedRoute exact path="/" render={Home} />
        <ProtectedRoute 
          path="/create" 
          render={ props => <CreateGroupChat {...props} setChatList={setChatList} />
        } />
        <ProtectedRoute 
          path="/list" 
          render={ props => <GroupChatList {...props} chatList={chatList} /> 
        } />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

const Nav = ({ setIsAuth }) => {
  const history = useHistory();

  const onLogout = () => {
    Auth.logout(() => {
      localStorage.removeItem('token');
      setIsAuth(false);
      history.replace('/login');
    });
  }

  return (
    <div>
      <div className="shadow p-4">
        <nav className="font-mono text-gray-600">
          <ul className="flex items-center">
            <li className="mr-6 hover:text-blue-300 px-4 py-2">
              <Link to="/">Home</Link>
            </li>
            <li className="mr-6 hover:text-blue-300 px-4 py-2">
              <Link to="/create">Create new group</Link>
            </li>
            <li className="mr-6 hover:text-blue-300">
              <Link to="/list">Chat list</Link>
            </li>
            <li className="h-8 w-px mx-2 bg-gray-500">
            </li>
            <li className="mr-6">
              <button className="rounded px-4 py-2 hover:bg-red-300 hover:text-white transition duration-300 ease-in-out" onClick={ onLogout }>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default App;
