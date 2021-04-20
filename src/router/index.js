import React from "react";
import { Redirect } from "react-router-dom";
import NoMatch from "@containers/NoMatch";
import WeatherForecast from "@containers/WeatherForecast";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to={"/weatherForecast"} />,
  },
  {
    path: "/weatherForecast",
    component: WeatherForecast,
    breadcrumbName: "WeatherForecast",
  },
  {
    path: "*",
    component: NoMatch,
    exact: true,
  },
];

export default routes;
