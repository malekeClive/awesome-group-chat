import React from 'react';

export default function WithForm(title) {
  return (WrappedComponent => {
    return (props => {
      return (
        <div className="bg-gray-900 shadow-inner rounded w-1/2 h-64 my-12 mx-auto">
          <div className="p-12">
            <h3 className="text-gray-600 text-3xl mb-4">{ title }</h3>
            <WrappedComponent {...props} />
          </div>
        </div>
      )
    })
  })
}
