import React from "react";
import { Redirect } from "react-router-dom";
import NoMatch from "@containers/NoMatch";
import HomePage from "@containers/HomePage";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to={"/weatherForecast"} />,
  },
  {
    path: "/weatherForecast",
    component: HomePage,
    breadcrumbName: "WeatherForecast",
  },
  {
    path: "*",
    component: NoMatch,
    exact: true,
  },
];

export default routes;
