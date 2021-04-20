import React, { useState, useEffect } from "react";
import { Spin, Row, Col, Input, Button, Divider } from "antd";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { FetchDataLocation } from "@services";

const ComWeatherForecast = () => {
  const [locationValue, setLocationValue] = useState("");
  const [resultValue, setResultValue] = useState({
    msg: "",
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const updateResultValue = (data, msg) => {
    const value = { ...resultValue };
    value.msg = msg;
    value.data = data;
    setResultValue(value);
  };
  useEffect(updateResultValue, [locationValue]);
  const handleKeyPress = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      fetchLocationData();
    }
  };
  const fetchLocationData = () => {
    setLoading(true);
    const value = { ...resultValue };
    value.msg = "";
    FetchDataLocation(locationValue)
      .then((response) => {
        setLoading(false);
        const data = [...response];
        const msg = data.length <= 0 && "Sorry, no this data";
        updateResultValue(data, msg);
      })
      .catch((error) => {
        setLoading(false);
        const msg = error.msg && error.msg;
        updateResultValue([], msg);
      });
  };
  return (
    <div className="weatherForecast">
      <div className="weatherForecast__wrapper">
        <Row>
          <Col span={24}>
            <Input
              size="large"
              placeholder="enter your location"
              prefix={<EnvironmentOutlined />}
              value={locationValue}
              onChange={(e) => setLocationValue(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
              autoFocus
            />
          </Col>
          <Col span={24}>
            <br />
            <Button
              icon={<SearchOutlined />}
              type="primary"
              onClick={() => fetchLocationData()}
            >
              Search
            </Button>
            <Divider />
          </Col>
          <Col span={24}>
            <Spin spinning={loading}>
              {resultValue.msg && (
                <p className="color-error">{resultValue.msg}</p>
              )}
              {resultValue.data && resultValue.data.length === 1 && (
                <p>
                  search location： {resultValue.data[0].title}{" "}
                  {resultValue.data[0].location_type}
                </p>
              )}
            </Spin>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ComWeatherForecast;
