import dayjs from "dayjs";

export const formatDate = (
  date?: Date | string,
  format = "MMMM D, YYYY h:mm A"
) => {
  if (!date) {
    return "";
  }
  return dayjs(date).format(format);
};
