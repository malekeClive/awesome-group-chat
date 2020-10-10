import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './tailwind.output.css';

import Auth from './Components/auth';
import ProtectedRoute from './Components/ProtectedRoute';
import UnprotectedRoute from './Components/UnprotectedRoute';

import Home from './Components/Home';
import CreateGroupChat from './Components/CreateGroupChat';
import GroupChatList from './Components/GroupChatList';
import Login from './Components/Login';
import RoomChat from './Components/RoomChat';

const apiURL = 'http://localhost:5000';

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiURL];
    const token = localStorage.getItem('token');

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

function App() {
  const [ isAuth, setIsAuth ] = useState(Auth.isAuthenticated());

  return (
    <Router>
      <div>
        {isAuth ? 
          <Nav setIsAuth={setIsAuth} />
        :
          null
        }

        <Switch>
          <UnprotectedRoute 
            path="/login" 
            render={ (props) => <Login {...props} setIsAuth={setIsAuth} /> } 
          />
          <ProtectedRoute 
            exact 
            path="/" 
            render={ (props) => <Home {...props} /> } 
          />
          <ProtectedRoute 
            path="/create" 
            render={ (props) => <CreateGroupChat {...props} /> } 
          />
          <ProtectedRoute 
            path="/list" 
            render={(props) => <GroupChatList {...props} /> }
          />
          <ProtectedRoute 
            path="/room-chat" 
            render={ (props) => <RoomChat {...props} /> }
          />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    </Router>
  );
}

const Nav = ({ setIsAuth }) => {
  const history = useHistory();

  const onLogout = () => {
    Auth.logout(() => {
      setIsAuth(false);
      localStorage.removeItem('token');
      history.replace("/login")
    });
  }
  return (
    <div className="bg-gray-100 p-4">
      <nav>
        <ul className="flex">
          <li className="mr-6">
            <Link to="/">Home</Link>
          </li>
          <li className="mr-6">
            <Link to="/create">Create new group</Link>
          </li>
          <li className="mr-6">
            <Link to="/list">Chat list</Link>
          </li>
          <li className="mr-6">
            <button onClick={onLogout}>Logout</button>
          </li>
 
        </ul>
      </nav>
    </div>
  )
}

export default App;
