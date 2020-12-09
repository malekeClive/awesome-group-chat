import React from 'react';

export default function WithForm(title) {
  return (WrappedComponent => {
    return (props => {
      return (
        <div className="h-screen mx-auto rounded bg-gray-800">
          <h3 className="text-gray-600 text-3xl mb-4">{ title }</h3>
          <WrappedComponent {...props} />
        </div>
      )
    })
  })
}
