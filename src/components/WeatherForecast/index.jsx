import React, { useState } from "react";
import { Row, Col } from "antd";
import LocationSearch from "./LocationSearch";
import { DateFormat, ValueFormat } from "@utils";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const WeatherForecast = () => {
  const [data, setData] = useState([]);
  const color = ["#8bfdfc", "#46a2f7", "#3f74f7", "#3e44ff", "#127e41"];
  console.log(data);
  const filterBarDataMax = (data) => {
    const newArr = [];
    for (let i in data) {
      newArr[i] = {};
      newArr[i].name = DateFormat(data[i].applicable_date);
      newArr[i].value = ValueFormat(data[i].max_temp);
      newArr[i].color = color[i];
    }
    return newArr;
  };
  const filterBarDataMin = (data) => {
    const newArr = [];
    for (let i in data) {
      newArr[i] = {};
      newArr[i].name = DateFormat(data[i].applicable_date);
      newArr[i].value = ValueFormat(data[i].min_temp);
      newArr[i].color = color[i];
    }
    return newArr;
  };
  const filterPieData = (data) => {
    const newArr = [];
    for (let i in data) {
      newArr[i] = {};
      newArr[i].name = DateFormat(data[i].applicable_date);
      newArr[i].value = data[i].humidity;
      newArr[i].color = color[i];
    }
    return newArr;
  };
  return (
    <div className="weatherForecast">
      <div className="weatherForecast__wrapper">
        <Row>
          <Col span={24}>
            <LocationSearch callback={(value) => setData(value)} />
          </Col>
          <Col span={24}>
            {data.length > 0 && (
              <>
                <h1>高溫變化</h1>
                <BarChart barData={filterBarDataMax(data)} />
              </>
            )}
          </Col>
          <Col span={24}>
            {data.length > 0 && (
              <>
                <h1>低溫變化</h1>
                <BarChart barData={filterBarDataMin(data)} />
              </>
            )}
          </Col>
          <Col span={24}>
            {data.length > 0 && (
              <>
                <h1>濕度</h1>
                <PieChart pieData={filterPieData(data)} />
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default WeatherForecast;
