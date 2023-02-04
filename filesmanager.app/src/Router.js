import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
//import PrivateRoute from "./PrivateRoute";
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => 'loading'
  });

const routes = [
   {
    path: "/files",
    component: loadable(() => import("./component/files/FilesTable")),
    exact: true,
  },
  // {
  //   path: "/callback",
  //   component: loadable(() => import("./components/auth/Callback")),
  //   public: true,
  //   exact: true,
  // },
  // {
  //   path: "/silent",
  //   component: loadable(() => import("./components/auth/Silent")),
  //   public: true,
  //   exact: true,
  // },
  // {
  //   path: "/forbidden",
  //   component: loadable(() => import("./components/auth/Forbidden")),
  //   public: true,
  //   exact: true,
  // },
  // {
  //   path: "/productos/tipos/agregar",
  //   component: loadable(() => import("./components/products/productTypes/ProductTypeAdd")),
  //   exact: true
  // },
  // {
  //   path: "/productos/tipos/:id",
  //   component: loadable(() => import("./components/products/productTypes/ProductTypeEdit")),
  //   exact: true
  // },
  // {
  //   path: "/ventas/vendedores/:id",
  //   component: loadable(() => import("./components/sales/sellers/SellerEdit")),
  //   exact: true
  // },
  // {
  //   path: "/",
  //   component: loadable(() => import("./components/sales/customers/CustomerList")),
  //   exact: true
  //}
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
