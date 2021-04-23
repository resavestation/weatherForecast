export function DateFormat(date) {
  const dateStr = date.split(".")[0];
  let dateString = dateStr.replace(/-/g, "/").replace("T", " ");

  const timestamp = Date.parse(new Date(dateString)) + 28800000;
  // 28800
  let newDate = new Date();
  newDate.setTime(timestamp);
  const options = {
    day: "2-digit", //(e.g., 1)
    month: "2-digit", //(e.g., Oct)
  };
  let dateStringFormat = newDate.toLocaleString("zh-TW", options);
  return dateStringFormat;
}

export function ValueFormat(data) {
  return Number(data.toFixed(2));
}
