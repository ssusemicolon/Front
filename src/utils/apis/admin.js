import { customAxios } from "../customAxios";

export const fetchStoreApi = async (storeId) => {
  const { data } = await customAxios.get(`/stores/${storeId}`);
  return data.data;
};

export const registerStoreApi = async (body) => {
  const { data } = await customAxios.post(`/stores`, body);
  return data.data;
};

export const editStoreApi = async (storeId, body) => {
  const { data } = await customAxios.put(`/stores/${storeId}`, body);
  return data.data;
};

export const deleteStoreApi = async ({ password, storeId }) => {
  const { data } = await customAxios.put(`/stores/${storeId}`, {
    password,
  });
  return data.data;
};
