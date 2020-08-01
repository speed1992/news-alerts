exports.convertToDateObject = (dateString) => {
  return new Date(Date.parse(dateString));
};

exports.convertToHumanReadableDate = (inputDate) => {
  const day = date.getDay();
  const monthName = inputDate.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const date = convertToDateObject(published_at);

convertToHumanReadableDate(date);
