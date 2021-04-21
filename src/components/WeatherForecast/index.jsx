import React, { useState } from "react";
import { Row, Col } from "antd";
import LocationSearch from "./LocationSearch";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const WeatherForecast = () => {
  const [data, setData] = useState([]);
  console.log(data);
  return (
    <div className="weatherForecast">
      <div className="weatherForecast__wrapper">
        <Row>
          <Col span={24}>
            <LocationSearch callback={(value) => setData(value)} />
          </Col>
          <Col span={24}>
            <BarChart data={data} />
          </Col>
          <Col span={24}>
            <PieChart data={data} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default WeatherForecast;
