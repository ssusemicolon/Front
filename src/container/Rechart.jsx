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
import { useDateChart } from "../utils/hooks/useChart";
import { formatDate } from "../utils/util";
import { VStack } from "./Admin/Layout";
import { MyCalendar } from "./Calendar";
import { Spacing } from "../component/Spacing";
import { useTheme } from "styled-components";
import { Hr } from "../styles/Style";

export const DateChart = ({ storeId, date, handleDateChange }) => {
  const theme = useTheme();

  const { data: dateChartData, isLoading } = useDateChart(
    storeId,
    formatDate(date),
  );

  if (isLoading) {
    return <>Loading..</>;
  }

  if (!dateChartData) {
    return;
  }

  const { densityPerHourList, openBusinessHour } = dateChartData;

  const data = densityPerHourList.map((density, diffHour) => {
    return {
      hour: openBusinessHour + diffHour,
      밀집도: density,
    };
  });

  return (
    <VStack>
      <MyCalendar onChange={handleDateChange} date={date} />
      <Spacing spacing={theme.spacing.lg} />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
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
          <XAxis dataKey="hour" />
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
