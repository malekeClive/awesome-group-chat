import React from 'react'

export default function GroupChatList({ chatList, openChatRoom }) {
  return (
    <div>
      {
        chatList.length === 0 ?
          <div>Empty group</div>
        :
        chatList.map((group, idx) => (
          <div key={idx} className="flex flex-col bg-gray-300 my-2 p-2 cursor-pointer hover:bg-gray-400" onClick={() => openChatRoom(idx)}>
            <div>
              <h3 className="text-gray-700">
                {group.groupName}
              </h3>
            </div>
            <div>
              <p className="text-sm">
                asdasdkjasldkjalkzncxznxcnaqsndqwjeqlweqwe...
              </p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
