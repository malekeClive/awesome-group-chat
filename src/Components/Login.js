import React, { useState } from 'react';
import axios from 'axios';

import Auth from './AuthSingleton';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("cannot be null!");
      return;
    }

    const form = { email, password };

    axios.post('http://localhost:5000/api/login', form)
      .then((response) => {
        const token = response.data["auth-token"];
        Auth.login(() => {
          localStorage.setItem('token', token);
          props.setIsAuth(true);
          props.history.replace("/");
        });

      }).catch(err => {
        // console.log("ERROR: ", err.response.data); // err.response.data/status/header
        if (err.response.status === 406) {
          alert(err.response.data.message);
        }
      });

  }

  return (
    <div className="bg-gray-300 w-64 h-screen relative flex-col">
      <div>
        <h1 className="text-5xl text-gray-700 text-center font-semibold font-mono">Text Me</h1>
      </div>
      <div>
        <form onSubmit={onLogin} className="absolute bottom-0 p-4 text-gray-700 font-mono">
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input className="rounded px-3 py-2 outline-none" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@gmail.com" />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input className="rounded px-3 py-2 outline-none" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" />
          </div>
          <div className="mb-4">
            <input type="submit" value="Login" className="rounded px-4 py-2 cursor-pointer hover:bg-gray-500 hover:text-white bg-white shadow-xl" />
          </div>
        </form>
      </div>
    </div>
  )
}
