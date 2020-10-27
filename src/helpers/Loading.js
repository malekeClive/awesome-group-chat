import React, { useState, useEffect, Fragment } from 'react'

export default function Loading({ isShowed }) {
  const [  ] = useState(false);
  return (
    <Fragment>
      <svg className="spinner animate-spin" viewBox="0 0 60 60">
        <path className="full-circle" fill="none" strokeWidth="5" d="M10,30 a20,20 0 0,1 20,-20" />
        <path className="half-circle" fill="none" strokeWidth="5" d="M10,30 a20,20 0 1,0 20,-20" />
      </svg>
    </Fragment>
  )
}
