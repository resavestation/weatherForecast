import React, { useState, useEffect } from "react";
import { Select, Spin, Row, Col, Input, Button, Divider } from "antd";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { FetchDataLocation } from "@services";
const { Option } = Select;

const ComWeatherForecast = () => {
  const [locationValue, setLocationValue] = useState("");
  const [woeid, setWoeid] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [resultValue, setResultValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const updateResultValue = (data, msg) => {
    setErrorMsg(msg);
    setResultValue(data);
    setLoading(false);
  };
  useEffect(updateResultValue, [locationValue]);
  const handleKeyPress = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      fetchLocationData();
    }
  };
  const fetchLocationData = () => {
    setLoading(true);
    FetchDataLocation(locationValue)
      .then((response) => {
        const data = [...response];
        const msg = data.length <= 0 && "Sorry, no this data";
        updateResultValue(data, msg);
      })
      .catch((error) => {
        const msg = error.msg && error.msg;
        updateResultValue([], msg);
      });
  };
  const forMapLocation = (item) => {
    return (
      <Option key={item.woeid} value={item.woeid}>
        {item.title} {item.location_type}
      </Option>
    );
  };
  const locationChild = resultValue && resultValue.map(forMapLocation);
  const onChange = (value) => {
    setWoeid(value);
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
              {errorMsg && <p className="color-error">{errorMsg}</p>}
              {resultValue && resultValue.length === 1 && (
                <p>
                  search location： {resultValue[0].title}{" "}
                  {resultValue[0].location_type}
                </p>
              )}
              {resultValue && resultValue.length > 1 && (
                <Select
                  placeholder="Over 1 area, Please Select location"
                  style={{ width: "100%" }}
                  onChange={(value) => onChange(value)}
                >
                  {locationChild}
                </Select>
              )}
            </Spin>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ComWeatherForecast;
