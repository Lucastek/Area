import React from "react";
import { Route, Redirect, } from 'react-router-dom'

const PrivateRoute = ({ component: Comp, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          return (
            <Redirect
              to={{
                pathname: " ",
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

export default PrivateRoute