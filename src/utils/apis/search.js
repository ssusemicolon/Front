import { customAxios } from "../customAxios";

export const fetchSearchResultApi = async (query) => {
  if (!query) {
    return [];
  }
  const { data } = await customAxios.get(`/stores/search?query=${query}`);
  return data.data;
};
