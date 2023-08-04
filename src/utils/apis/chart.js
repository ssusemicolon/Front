import { customAxios } from "../customAxios";

export const fetchWeeklyChartApi = async (storeId) => {
  if (!storeId) {
    return undefined;
  }
  const { data } = await customAxios.get(`/stores/${storeId}/density/pastWeek`);
  return data.data;
};

export const fetchDateChartApi = async (storeId, date) => {
  if (!storeId && !date) {
    return undefined;
  }
  const { data } = await customAxios.get(
    `/stores/${storeId}/density?specificDate=${date}`,
  );
  return data.data;
};
