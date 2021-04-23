import React, { useState, useEffect, useRef } from "react";
import { Spin } from "antd";

const BarChartCanvas = (props) => {
  const barData = props.barData ? props.barData : [];
  const refBar = useRef();
  const [loading, setLoading] = useState(false);
  const fontData = props.fontData
    ? props.fontData
    : {
        fontSize: 14,
        fontFamily: "Arial",
        fontColor: "#333",
      };
  const barChartInit = () => {
    const canvasWrapper = refBar.current;
    if (canvasWrapper) {
      setLoading(true);
      canvasWrapper.innerHTML = "";
      const canvasElem = document.createElement("canvas");
      const wrapperWidth = canvasWrapper.offsetWidth;
      const sumData = barData.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
      }, 0);
      const maxData = barData.reduce((accumulator, currentValue) => {
        if (currentValue.value >= accumulator) return currentValue.value;
        else return accumulator;
      }, 0);
      const unitWidth = wrapperWidth / barData.length;
      const unitHeight = (1 / sumData) * unitWidth * 10;
      const wrapperHeight =
        maxData * unitHeight + fontData.fontSize * (barData.length + 2);
      canvasElem.setAttribute("width", wrapperWidth);
      canvasElem.setAttribute("height", wrapperHeight);
      drawBarChart(canvasElem, unitWidth, unitHeight, wrapperHeight);
      drawBarChartText(canvasElem);
      canvasWrapper.appendChild(canvasElem);
      const timer = setTimeout(() => {
        setLoading(false);
        clearTimeout(timer);
      }, 2000);
    }
  };
  const drawBarChart = (item, unitWidth, unitHeight, wrapperHeight) => {
    var c = item;
    var ctx = c.getContext("2d");
    let offsetX = 0;
    for (let i = 0; i < barData.length; i++) {
      const barHeight = barData[i].value * unitHeight;
      ctx.fillStyle = barData[i].color;
      ctx.fillRect(
        offsetX,
        wrapperHeight - barHeight - fontData.fontSize,
        unitWidth,
        barHeight - fontData.fontSize
      );
      ctx.font = `${fontData.fontSize}px ${fontData.fontFamily}`;
      ctx.fillStyle = fontData.fontColor;
      const text = `${barData[i].name} ${barData[i].value}`;
      ctx.fillText(
        text,
        offsetX + unitWidth / 4,
        wrapperHeight - fontData.fontSize
      );
      offsetX = offsetX + unitWidth;
    }
  };
  const drawBarChartText = (item) => {
    const cvs = item;
    const ctx = cvs.getContext("2d");
    for (let i in barData) {
      ctx.beginPath();
      ctx.fillStyle = barData[i].color;
      ctx.fillRect(12, 12 + 14 * i, 10, 10);
      ctx.font = `${fontData.fontSize}px ${fontData.fontFamily}`;
      ctx.fillStyle = fontData.fontColor;
      ctx.textAlign = "start";
      ctx.fillText(barData[i].name + " " + barData[i].value, 25, 20 + 14 * i);
    }
  };
  useEffect(barChartInit, [barData]);
  return (
    <Spin tip="Bar Chart loading..." spinning={loading}>
      <div className="canvasBarChart">
        <div ref={refBar} className="canvasBarChart__wrapper"></div>
      </div>
    </Spin>
  );
};
export default BarChartCanvas;
