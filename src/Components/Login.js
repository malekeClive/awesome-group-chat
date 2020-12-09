import React, { useState } from 'react';
import axios from 'axios';
import { URL, PORT } from '../utils/url';
import jwt_decode from 'jwt-decode';

import { useDispatch } from 'react-redux';
import { setUserData } from '../actions/actionUser';

import auth from '../Components/auth';

export default function Login(props) {
  const [ email, setEmail ]       = useState("");
  const [ password, setPassword ] = useState("");

  const storeUser = useDispatch();

  const onLogin = (e) => {
    e.preventDefault();

    // validate
    if (email === "" || password === "") {
      alert('value cannot be null');
      return;
    }

    const user = {email, password};
    axios.post(`${URL}:${PORT}/`, user)
      .then(res => {
        auth.login( () => {
          localStorage.setItem('token', res.data.auth);
          convertJWTtoObj(res.data.auth);
          props.history.replace("/")
        });
      }).catch(err => {
        if (err.response.status === 406) {
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      });
  }

  const convertJWTtoObj = (jwtUser) => {
    const decoded = jwt_decode(jwtUser).getUser[0];
    const user = {
      userId: decoded.user_id,
      email: decoded.email,
      username: decoded.username
    }
    console.log(user);
    storeUser(setUserData(user));
  }

  return (
    <div className="relative h-screen w-full sm:w-64 font-mono flex flex-col text-orange-400 bg-gray-800">
      <h3 className="m-4 text-4xl text-center">Simple Chat</h3>
      <form onSubmit={onLogin} className="absolute flex flex-col items-center mb-8 bottom-0 left-0 right-0 text-center">
        <div className="text-left mb-2">
          <label className="block mb-2">Email</label>
          <input 
            className="w-full sm:w-48 rounded outline-none px-4 py-2 bg-gray-900"
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="text-left">
          <label className="block mb-2">Password</label>
          <input
            className="w-full sm:w-48 rounded outline-none px-4 py-2 bg-gray-900"
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="m-4">
          <input 
            className="rounded px-6 py-2 hover:bg-orange-400 hover:text-gray-900 bg-transparent border border-orange-400 cursor-pointer" 
            type="submit" 
            value="Login" />
        </div>
      </form>
    </div>
  )
}
