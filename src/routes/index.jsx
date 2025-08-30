// Library Imports
import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Local Imports
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { authRoutes, pannelRoutes } from './config';

export const Router = () => {
  return (
    <Fragment>
      <Routes>
        <Route element={<PrivateRoutes />}>
          {pannelRoutes?.map((route, index) => {
            return route.child ? (
              route.child.map((childRoute, index) => (
                <Fragment key={index}>
                  <Route path={route.path} element={route.element} />
                  <Route path={childRoute.path} element={childRoute.element} />
                </Fragment>
              ))
            ) : (
              <Route path={route.path} element={route.element} key={index} />
            );
          })}
        </Route>
        <Route element={<PublicRoutes />}>
          {authRoutes?.map((route, index) => {
            return (
              <Route path={route?.path} element={route?.element} key={index} />
            );
          })}
        </Route>
      </Routes>
    </Fragment>
  );
};
