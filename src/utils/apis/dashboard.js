import { customAxios } from "../customAxios";

export const fetchStoreListApi = async ({ radius, latitude, longitude }) => {
  const { data } = await customAxios.get(
    `/store/nearby?radius=${radius}&latitude=${latitude}&longitude=${longitude}`,
  );
  return data.data;
};
