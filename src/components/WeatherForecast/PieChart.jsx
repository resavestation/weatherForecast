import React, { useEffect, useRef } from "react";

const PieChartPercentCanvas = (props) => {
  const pieData = props.pieData ? props.pieData : [];
  const refPie = useRef();
  const pieChartInit = () => {
    const canvasWrapper = refPie.current;
    if (canvasWrapper) {
      canvasWrapper.innerHTML = "";
      const canvasElem = document.createElement("canvas");
      const wrapperWidth = canvasWrapper.offsetWidth;
      const wrapperHeight = 0.75 * wrapperWidth;
      const radius = 0.25 * wrapperWidth;
      canvasElem.setAttribute("width", wrapperWidth);
      canvasElem.setAttribute("height", wrapperHeight);
      drawPieChart(canvasElem, wrapperWidth, wrapperHeight, radius);
      drawPieChartText(canvasElem);
      canvasWrapper.appendChild(canvasElem);
    }
  };
  const drawPieChart = (item, wrapperWidth, wrapperHeight, radius) => {
    let begin_deg = (-90 * Math.PI) / 180;
    const sumData = pieData.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.value;
    }, 0);
    const cvs = item;
    const ctx = cvs.getContext("2d");
    const x = wrapperWidth / 2;
    const y = wrapperHeight / 2;
    for (let i in pieData) {
      const value_deg = ((pieData[i].value / sumData) * 360 * Math.PI) / 180;
      const end_deg = begin_deg + value_deg;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, radius, begin_deg, end_deg);
      ctx.fillStyle = pieData[i].color;
      ctx.fill();
      const text_deg = begin_deg + value_deg * 0.5;
      const text_X = x + (radius + 10) * Math.cos(text_deg);
      const text_Y = y + (radius + 10) * Math.sin(text_deg);
      if (text_deg > (90 * Math.PI) / 180 && text_deg < (270 * Math.PI) / 180) {
        ctx.textAlign = "end";
      }
      ctx.font = "14px Arial";
      ctx.fillStyle = "#333";
      const text = `${pieData[i].name} ${pieData[i].value}`;
      ctx.fillText(text, text_X, text_Y);
      begin_deg = end_deg;
    }
  };
  const drawPieChartText = (item) => {
    const cvs = item;
    const ctx = cvs.getContext("2d");
    for (let i in pieData) {
      ctx.beginPath();
      ctx.fillStyle = pieData[i].color;
      ctx.fillRect(12, 12 + 14 * i, 10, 10);
      ctx.font = "14px Arial";
      ctx.fillStyle = "#333";
      ctx.textAlign = "start";
      ctx.fillText(pieData[i].name + " " + pieData[i].value, 25, 20 + 14 * i);
    }
  };
  useEffect(pieChartInit, [pieData]);
  return (
    <div className="canvasPieChart">
      <div ref={refPie} className="canvasPieChart__wrapper"></div>
    </div>
  );
};
export default PieChartPercentCanvas;
