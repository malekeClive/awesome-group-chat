import React from 'react';

export default function SkeletonComponent() {
  const Skeletons = ({ sLength }) => {
    const skeletonList  = [];
    for (let idx = 0; idx < sLength; idx++) {
      skeletonList.push(
        <li key={idx} className="m-4 rounded w-1/6 bg-gray-900 p-3">
          <div className="animate-pulse">
            <div className="h-6 w-3/6 rounded bg-gray-800 mb-2"></div>
            <div className="h-16 rounded bg-gray-800"></div>
          </div>
        </li>
      )
    }

    return skeletonList;
  }  

  return (
    <ul className="flex flex-wrap">
      <Skeletons sLength={ 6 } />
    </ul>
  )
}
