import React, { useState } from "react";
import styled from "styled-components";
import Icon from "../component/Icon";
import { Hr } from "../styles/Style";
import { WeeklyChart } from "./Chart";
import { DateChart } from "./Rechart";
import { HStack } from "./Admin/Layout";

const SwitchWrapper = styled.div`
  width: 800px;
  height: 424px;
  margin: 0 auto;
  display: flex;
`;

const SwitchButtonWrapper = styled.button`
  border: none;
  font-size: 1.5rem;
`;

const ChartToggle = ({ storeId }) => {
  const [showMyChart, setShowMyChart] = useState(true); // 처음에는 MyChart를 보여줍니다.
  const [date, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleToMyChart = () => {
    setShowMyChart(true); // MyChart 보기
  };

  const toggleToRechart = () => {
    setShowMyChart(false); // Rechart 보기
  };

  return (
    <div>
      <SwitchWrapper>
        <SwitchButtonWrapper onClick={toggleToMyChart}>
          <Icon.Left />
        </SwitchButtonWrapper>

        {showMyChart ? (
          <WeeklyChart storeId={storeId} />
        ) : (
          <DateChart
            storeId={storeId}
            date={date}
            handleDateChange={handleDateChange}
          />
        )}

        <SwitchButtonWrapper onClick={toggleToRechart}>
          <Icon.Right />
        </SwitchButtonWrapper>
      </SwitchWrapper>
    </div>
  );
};

export default ChartToggle;
