import React from 'react'

export default function GroupChatList() {
  const testList = [
    {
      id: 1,
      groupName: "test1",
      members: 20,
    },
    {
      id: 2,
      groupName: "test2",
      members: 20,
    },
    {
      id: 3,
      groupName: "test3",
      members: 20,
    },
    {
      id: 4,
      groupName: "test4",
      members: 20,
    },
    {
      id: 5,
      groupName: "test5",
      members: 20,
    },
  ]

  const openChatRoom = (groupId) => {
    console.log(groupId);
  }

  return (
    <div>
      {
        testList.map(group => (
          <div key={group.id} className="flex flex-col bg-gray-300 my-2 p-2 cursor-pointer hover:bg-gray-400" onClick={() => openChatRoom(group.id)}>
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
