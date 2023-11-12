import dayjs from "dayjs";

export const formatDate = (date?: Date | string) => {
  if (!date) {
    return "";
  }
  return dayjs(date).format("MMMM D, YYYY h:mm A");
};