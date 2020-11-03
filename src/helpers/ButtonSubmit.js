import React from 'react'

export default function ButtonSubmit({ submitHandler, loading, label }) {
  return (
    <button className={`${loading ? "cursor-not-allowed" : null } flex items-center float-right px-3 py-2 rounded cursor-pointer bg-purple-800 hover:bg-purple-900 bg-transparent font-sans text-gray-300`} onClick={submitHandler}>
      <svg className={`${loading ? 'block' : 'hidden'} spinner animate-spin`} viewBox="0 0 60 60">
        <path className="full-circle" fill="none" strokeWidth="5" d="M10,30 a20,20 0 0,1 20,-20" />
        <path className="half-circle" fill="none" strokeWidth="5" d="M10,30 a20,20 0 1,0 20,-20" />
      </svg>
      <p className="mx-auto">{ label }</p>
    </button>
  )
}
