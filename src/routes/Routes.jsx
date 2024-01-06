import React from 'react'
import { Routes as Switch, Route, useLocation } from "react-router-dom";
import { AppRoutes } from './Routes/app_routes';


const Routes = () => {
    // const location = useLocation();
// location={location} key={location.key}
  return (
    <Switch >
      {/* ----- GENERAL ----- */}
      {AppRoutes.map((r) => {
        const { type, path, ...rest } = r;

        return <Route {...rest} exact key={`${path}`} path={`/${path}`} />;
      })}

      </Switch>
  )
}

export default Routes