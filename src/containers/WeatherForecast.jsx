import React from "react";
import LayoutSingle from "@layouts/LayoutSingle";
import WeatherForecast from "@components/WeatherForecast";

const HomePage = () => {
  return (
    <LayoutSingle>
      <WeatherForecast />
    </LayoutSingle>
  );
};
export default HomePage;
