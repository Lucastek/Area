import React from "react";
import { Route, Redirect, } from 'react-router-dom'

const ProtectedRoute = ({ component: Comp, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          return localStorage.getItem('loggedIn') === "true" ? (
            <Comp {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }}
      />
    );
  };

export default ProtectedRoute