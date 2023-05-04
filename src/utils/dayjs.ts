import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const formatDate = (date: Date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const timeFromNow = (date: Date) => {
  return dayjs(date).locale("pt-br").fromNow();
};
