import React from "react";
import LayoutSingle from "@layouts/LayoutSingle";
import { AuthorizedFirebase } from "@firebase";
import WeatherForecast from "@components/WeatherForecast";

const HomePage = () => {
  return (
    <AuthorizedFirebase>
      <LayoutSingle>
        <WeatherForecast />
      </LayoutSingle>
    </AuthorizedFirebase>
  );
};
export default HomePage;
