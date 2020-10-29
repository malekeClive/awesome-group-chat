import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import './tailwind.output.css';

import ProtectedRoute from './helpers/ProtectedRoute';
import UnprotectedRoute from './helpers/UnprotectedRoute';

import Auth from './Components/auth';
import Join from './Components/Join';
import Create from './Components/Create';
import GroupChatList from './Components/Room/GroupChatList';
import Login from './Components/Login';
import RoomChat from './Components/Chat/RoomChat';
import Nav from './Components/Nav';

axios.interceptors.request.use( config => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    console.log("ERROR: ", error);
    return error;
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
            render={ (props) => <Join {...props} /> } 
          />
          <ProtectedRoute 
            path="/create" 
            render={ (props) => <Create {...props} /> } 
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

export default App;
