const ConvertTime = (data) => {
  let minutes = data.toString().split(".")[0];
  let seconds = parseInt(
    Number("0." + data.toFixed(2).toString().split(".")[1]) * 60
  );
  let date;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  date = `${minutes}:${seconds}`;

  return date;
};

export default ConvertTime;
