import React from 'react'
import auth from './auth';

export default function ChatBubble({ chat }) {
  return (
    <div className="m-1 text-gray-800">
      <div className={`shadow-md rounded-lg p-4 float-${ chat.uId !== auth.user.userId ? 'left' : 'right' }`}>
        <div className="border-b-2">
          <div>
            <h4 className="font-mono text-xl">
              { chat.name }
            </h4>
          </div>
        </div>

        <div className="mt-2">
          <p className="font-mono text-lg">
            { chat.msg }
          </p>
        </div>
      </div>
    </div>
  )
}
