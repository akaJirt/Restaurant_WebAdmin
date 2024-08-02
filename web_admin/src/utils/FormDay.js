import moment from "moment";

const FormatDay = (value) => {
  return moment(value).format("DD-MM-YYYY HH:mm:ss");
};

const FormatDay2 = (value) => {
  return moment(value).format("DD-MM-YYYY");
};

const FormatTimeNow = (value) => {
  return moment(value).format("HH:mm:ss");
};
const Regex = () => {
  return /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z)/;
};

const FormatDay3 = (value) => {
  return moment.utc(value).format("DD-MM-YYYY HH:mm:ss");
};
export { FormatDay, FormatDay2, FormatTimeNow, Regex, FormatDay3 };
