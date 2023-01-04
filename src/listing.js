const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const formatDate = (value) => {
  return value.toLocaleString("en-GB", dateOptions);
};
const getTime = (value) => {
  let time = value.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  if (time === "0:00 pm") {
    return "12 noon";
  } else if (time.startsWith("0")) {
    time = `12${time.slice(1)}`;
  }
  return time.replace(" ", "");
};
