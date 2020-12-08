import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import auth from '../Components/auth';

import Nav from '../Components/Nav';

export default function ProtectedRoute({render: Component, ...rest}) {
  return (
    <Route {...rest} render={
      (props) => {
        if (auth.isAuthenticated()) {
          return (
            <div className="h-screen flex flex-col">
              <Nav />
              <Component {...props} />
            </div>
          ) 
        } else {
          return <Redirect to={
            {
              pathname: "/login",
              state: {
                from: props.location
              }
            }
          }/>
        }
      }
    }
    />
  )
}