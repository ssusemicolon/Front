import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { MyCalendar } from "../container/Calendar";
import Header from "../container/Header";
import MapContainer from "../container/MapContainer";
import Market from "../container/Market";
import StoreThumbContainer, {
  DensityStatusImageContainer,
} from "../container/Picture";
import ChartToggle from "../container/ToggleChart";
import DensityInfoContainer from "../container/density";
import { useDetailBoard } from "../utils/hooks/useDetailboard";
import { useAppDispatch } from "../store/Hooks";
import { mapActions } from "../store/ducks/mapSlice";
import { Hr } from "../styles/Style";
import { Spacing } from "../component/Spacing";

const Container = styled.div``;

const HrWrapper = styled.div`
  margin: auto;
  width: 50%;
`;

export const DetailPage = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isLoading: isStoreLoading,
    data: storeDetail,
    error,
  } = useDetailBoard(storeId);

  useEffect(() => {
    if (!storeDetail || !storeDetail?.longitude || !storeDetail?.latitude) {
      return;
    }

    const { longitude, latitude } = storeDetail;
    console.log("lng: ", longitude, " ", latitude);

    dispatch(mapActions.setCenter({ latitude, longitude }));
  }, [dispatch, storeDetail]);

  if (!storeId) {
    navigate("/");
  }

  if (isStoreLoading) {
    return <>로딩중...</>;
  }

  if (error) {
    return <>{error}</>;
  }

  const { thumUrl, density, longitude, latitude } = storeDetail;

  return (
    <Container>
      <Header />
      <MapContainer width={"100vw"} height={"65vh"} marginTop="0px" />
      <StoreThumbContainer thumurl={thumUrl} />
      <DensityStatusImageContainer density={density} />

      <Market data={storeDetail} />
      <DensityInfoContainer storeInfo={storeDetail} />

      <HrWrapper>
        <Hr />
      </HrWrapper>

      <ChartToggle storeId={storeId} />
      <Spacing spacing={"5vh"} />
    </Container>
  );
};
