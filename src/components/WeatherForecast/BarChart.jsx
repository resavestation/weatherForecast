import React, { useEffect } from "react";

const BarChartCanvas = (props) => {
  const barData = props.barData ? props.barData : [];
  console.log(barData);
  const fontData = props.fontData
    ? props.fontData
    : {
        fontSize: 14,
        fontFamily: "Arial",
        fontColor: "#333",
      };
  const barChartInit = () => {
    const canvasWrapper = document.getElementsByClassName(
      "canvasBarChart__wrapper"
    );
    if (canvasWrapper[0]) {
      const canvasElem = document.createElement("canvas");
      const wrapperWidth = canvasWrapper[0].offsetWidth;
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
      canvasWrapper[0].appendChild(canvasElem);
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
      const text = barData[i].name + barData[i].value;
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
  useEffect(barChartInit, []);
  return (
    <div className="canvasBarChart">
      <div className="canvasBarChart__wrapper"></div>
    </div>
  );
};
export default BarChartCanvas;
