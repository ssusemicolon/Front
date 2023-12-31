import { useQuery } from "@tanstack/react-query";
import { fetchStoreListApi } from "../apis/dashboard";

// 대시보드에 쓰이는 key들
export const dashboardKeys = {
  all: ["dashboard"],
  list: () => [...dashboardKeys.all, "list"],
  search: (q) => [...dashboardKeys.all, "search", { q }],
  nearBy: ({ radius, latitude, longitude }) => [
    ...dashboardKeys.all,
    "nearBy",
    { radius, latitude, longitude },
  ],
};

// Get 홈화면 - 데이터 가져오기
export const useNearStores = ({ radius, latitude, longitude }) => {
  return useQuery(dashboardKeys.nearBy({ radius, latitude, longitude }), () =>
    fetchStoreListApi({ radius, latitude, longitude }),
  );
};
