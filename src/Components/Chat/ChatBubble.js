import React from 'react'
import { useSelector } from 'react-redux';

export default function ChatBubble({ chat }) {
  const user  = useSelector(store => store.user);

  return (
    <div className="m-1 text-gray-800">
      <div className={`shadow-md bg-gray-100 rounded-lg p-4 float-${ chat.userId !== user.userId ? 'left' : 'right' }`}>
        <div className="border-b-2">
          <div>
            <h4 className="font-mono text-xl">
              { chat.username }
            </h4>
          </div>
        </div>

        <div className="mt-2">
          <p className="font-mono text-lg">
            { chat.description }
          </p>
        </div>
      </div>
    </div>
  )
}
