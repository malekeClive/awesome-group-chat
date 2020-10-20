import React, { useState } from 'react';
import axios from 'axios';
import { URL, PORT } from '../utils/url';
import auth from './auth';
import jwt_decode from 'jwt-decode';

import { useDispatch } from 'react-redux';
import { setUserData } from '../actions/actionUser';

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

    const data = {email, password};
    axios.post(`${URL}:${PORT}/`, data)
      .then(res => {
        auth.login( () => {
          props.setIsAuth(true);
          localStorage.setItem('token', res.data.auth);
          convertJWTtoObj(res.data.auth);
          props.history.replace("/")
        });
      }).catch(err => {
        console.log(err)
        if (err.response.status === 406) {
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      });
  }

  const convertJWTtoObj = (jwtUser) => {
    const decoded = jwt_decode(jwtUser).data[0];
    const user = {
      userId: decoded.user_id,
      email: decoded.email,
      username: decoded.username
    }
    storeUser(setUserData(user));
  }

  return (
    <div className="inline-block shadow h-screen font-mono text-gray-700">
      <div className="flex-col justify-around">
        <div className="mt-4">
          <h3 className="text-4xl text-center">[Text Me]</h3>
        </div>
        <div className="">
          <form onSubmit={onLogin} className="m-4">
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input 
                className="rounded outline-none shadow px-4 py-2"
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block">Password</label>
              <input
                className="rounded outline-none shadow px-4 py-2"
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mt-4">
              <input 
                className="rounded shadow bg-transparent hover:bg-blue-200 hover:text-white border-gray-500 px-6 py-2 cursor-pointer float-right" 
                type="submit" 
                value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
