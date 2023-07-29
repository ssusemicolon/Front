import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Text } from "../component/Text";
import { useWeeklyChart } from "../utils/hooks/useChart";
import { VStack } from "./Admin/Layout";

export const WeeklyChart = ({ storeId }) => {
  const { data: weeklyChartData, isLoading } = useWeeklyChart(storeId);

  if (isLoading) {
    return <>Loading...</>;
  }

  const WeekDensity = weeklyChartData?.densityPerDayList || [];
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  new Date().getDay();

  const data = days.map((dayTitle, index) => ({
    name: dayTitle,
    밀집도: WeekDensity[index],
  }));

  return (
    <VStack>
      <Text>주간평균 밀집도</Text>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="밀집도"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </VStack>
  );
};
