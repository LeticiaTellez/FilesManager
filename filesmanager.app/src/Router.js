import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
//import PrivateRoute from "./PrivateRoute";
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import AddFiles from "./component/files/AddFiles";
import FilesTable from "./component/files/FilesTable";

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => 'loading'
  });

const routes = [
  {
    path: "/files/add",
    component: loadable(() => import("./component/files/AddFiles")),
    exact: true
  },
  {
    path: "/files",
    component: loadable(() => import("./component/files/FilesTable")),
    exact: true,
  },
  {
    path: "/",
    component: loadable(() => import("./component/files/FilesTable")),
    exact: true
  }
];

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {routes.map(route => (
          route.public ? <Route path={route.path} component={() => <route.component />} key={route.path} />
            : <Route path={route.path} component={() => <route.component />} key={route.path} />
        ))}
      </Switch>
      <Footer />
    </BrowserRouter>
  );

}

export default Router;
