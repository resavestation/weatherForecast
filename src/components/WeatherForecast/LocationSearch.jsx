import React, { useState } from "react";
import { Spin, Select, Row, Col, Input, Button } from "antd";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { FetchDataLocation, FetchDataWeather } from "@services";
const { Option } = Select;
const LocationSearch = (props) => {
  const [locationValue, setLocationValue] = useState("");
  const [targetLocation, setTargetLocation] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const cleanlocationValue = () => {
    !locationValue && setErrorMsg("");
  };
  const handleKeyPress = (e) => {
    const keycode = e.nativeEvent.keyCode;
    switch (keycode) {
      case 13:
        return fetchLocationData();
      case 8:
        return cleanlocationValue();
      default:
        break;
    }
  };
  const updateValue = (data) => {
    setTargetLocation(data);
    FetchDataWeather(data[0].woeid).then((response) => {
      const data =
        response && response.consolidated_weather
          ? response.consolidated_weather
          : [];
      data instanceof Array &&
        typeof props.callback === "function" &&
        props.callback(data);
    });
  };
  const fetchLocationData = () => {
    if (locationValue) {
      setLoading(true);
      FetchDataLocation(locationValue)
        .then((response) => {
          const data = response instanceof Array ? response : [];
          let msg = "";
          data.length <= 0 && (msg = "Sorry, no this location data");
          data.length === 1 && updateValue(data);
          data.length > 1 && setTargetLocation(data);
          setErrorMsg(msg);
          setLoading(false);
        })
        .catch((error) => {
          error.msg && setErrorMsg(error.msg);
        });
    } else {
      setErrorMsg("enter your location!!");
    }
  };
  const forMapLocation = (item) => {
    return (
      <Option key={item.woeid} value={item.woeid}>
        {item.title} {item.location_type}
      </Option>
    );
  };
  const locationChild = targetLocation.map(forMapLocation);
  const onChange = (value) => {
    const filterLocation = targetLocation.find((item) => item.woeid === value);
    updateValue([filterLocation]);
  };
  const returnResult = () => {
    if (targetLocation.length > 0) {
      if (targetLocation.length === 1) {
        return (
          <p>
            search location： {targetLocation[0].title}{" "}
            {targetLocation[0].location_type}
          </p>
        );
      }
      return (
        <Select
          placeholder="Over 1 area, Please Select Correct location"
          style={{ width: "100%" }}
          onChange={(value) => onChange(value)}
        >
          {locationChild}
        </Select>
      );
    } else return "";
  };
  const result = returnResult();
  return (
    <Row>
      <Col span={24}>
        <Input
          size="large"
          placeholder="enter your location"
          prefix={<EnvironmentOutlined />}
          value={locationValue}
          onChange={(e) => setLocationValue(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          onKeyDown={(e) => handleKeyPress(e)}
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
      </Col>
      <Col span={24}>
        <Spin tip="Confirm Location Data..." spinning={loading}>
          <br />
          {errorMsg && <p className="color-error">{errorMsg}</p>}
          {result}
        </Spin>
      </Col>
    </Row>
  );
};
export default LocationSearch;
