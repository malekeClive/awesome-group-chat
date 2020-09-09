import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import './tailwind.output.css';

import Home from './Components/Home';
import CreateGroupChat from './Components/CreateGroupChat';
import GroupChatList from './Components/GroupChatList';
import RoomChat from './Components/RoomChat';

function App() {
  const [ chatList, setChatList ] = useState([{
    groupName: "test1",
    password: 123,
    confirmPassword: 123,
  }]);

  const [ room, setRoom ] = useState({});

  const [ showChat, setShowChat ] = useState(false);

  const openChatRoom = (groupId=null) => {
    let isChatOpen = true;
    
    if (groupId === null) {
      isChatOpen = false;
    } else {
      const getRoomChat = chatList.find((room, idx) => idx === groupId);
      setRoom(getRoomChat);
    }

    return setShowChat(isChatOpen);
  }

  const createNewChatGroup = (newList) => {
    const newGroupList = [...chatList, newList]
    setChatList(newGroupList);
  }

  return (
    <Router>
      <RoomChat closeChatRoom={openChatRoom} room={room} />

      {/* {
        showChat ? 
        <RoomChat closeChatRoom={openChatRoom} room={room} />
        :
        <div className="container mx-auto p-4">
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
              </ul>
            </nav>
          </div>

          <div className="mt-4">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/create">
                <CreateGroupChat createNewChatGroup={createNewChatGroup} />
              </Route>
              <Route path="/list">
                <GroupChatList chatList={chatList} openChatRoom={openChatRoom} />
              </Route>
            </Switch>
          </div>
        </div>
      } */}
    </Router>
  );
}

export default App;
