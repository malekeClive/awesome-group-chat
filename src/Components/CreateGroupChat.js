import React, { useState, useEffect, useRef } from 'react';

export default function CreateGroupChat({ createNewChatGroup }) {
  const [ groupName, setGroupName ] = useState("");
  const [ password, setPassword ]   = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const disableSubmitBtn = useRef(null);

  useEffect(() => {
    const createBtnValidate = () => {
      if (groupName.match(/^ *$/) !== null || password.match(/^ *$/) !== null || confirmPassword.match(/^ *$/) !== null) {
        disableSubmitBtn.current.disabled             = true;
        disableSubmitBtn.current.style.opacity        = "0.5";
        disableSubmitBtn.current.style.cursor         = "default";
        disableSubmitBtn.current.style.pointerEvents  = "none"; // disable hover and other pointer events
      } else {
        disableSubmitBtn.current.disabled             = false;
        disableSubmitBtn.current.style.opacity        = "1";
        disableSubmitBtn.current.style.cursor         = "pointer";
        disableSubmitBtn.current.style.pointerEvents  = "auto"; // disable hover and other pointer events
      }

    }
    
    createBtnValidate();
  }, [ groupName, password, confirmPassword ]);

  const onCreateNewGroup = (e) => {
    e.preventDefault();

    const form = {
      groupName,
      password,
      confirmPassword
    }
    
    createNewChatGroup(form);
    
    setGroupName("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div >
      <div>
        <form onSubmit={onCreateNewGroup}>
          <div className="mt-4">
            <label className="block">Group name</label>
            <input className="border border-gray-300 rounded focus:outline-none focus:bg-gray-100 mt-2 px-2 py-1" type="text" value={groupName} onChange={e => setGroupName(e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="block">Password</label>
            <input className="border border-gray-300 rounded focus:outline-none focus:bg-gray-100 mt-2 px-2 py-1" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="block">Confirm password</label>
            <input className={`border border-gray-300 rounded focus:outline-none focus:bg-${password === confirmPassword ? "gray" : "red"}-100 mt-2 px-2 py-1`} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </div>

          <div className="block mt-4">
            <input ref={disableSubmitBtn} className="cursor-pointer border border-none rounded bg-blue-300 hover:bg-blue-400 px-4 py-1 font-bold text-white" type="submit" value="Create" />
          </div>
        </form>
      </div>
    </div>
  )
}
