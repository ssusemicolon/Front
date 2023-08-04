import { customAxios } from "../customAxios";

export const fetchDetailBoardApi = async (storeId) => { //storeID를 매개변수로 받는 것이다. 그렇다면 어떻게 분리해주는가?
  if (!storeId) {
    return undefined;
  }
  const { data } = await customAxios.get(`/stores/${storeId}`);
  return data.data;
};

