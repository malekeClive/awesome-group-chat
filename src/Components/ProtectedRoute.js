import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Auth from './AuthSingleton';

export default function ProtectedRoute({ render: Component, ...rest }) {
  return (
    <Route { ...rest } render={
      props => {
        if (Auth.isAuthenticated()) {
          return (
            <Component {...rest} {...props} />
          )
        } else {
          return (
            <Redirect to={
              {
                pathname: "/login",
                state: {
                  from: props.location
                }
              }
            } />
          )
        }
      } 
    } />
  )
}