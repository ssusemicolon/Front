import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/Hooks.js";
import { mapActions } from "../store/ducks/mapSlice.js";
import MapButton from "./MapButton.jsx";

const { kakao } = window;

/**
 * @todo 마커 이미지 바꾸기, 확대/축소 변경, GPS 잡기 등
 * @param {*} props
 * @returns
 */

const MapContainer = (props) => {
  const { markers: propsMarkers, isSearched } = props;
  const { searchKeyword } = useAppSelector((store) => store.search);
  const { center, level } = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();
  const mapRef = useRef(null);
  const navigate = useNavigate();

  /**
   * 가게들의 평균위치 반환
   */
  const getMeanCenterOfMarkers = useCallback(() => {
    const meanCenter = propsMarkers.reduce(
      (acc, { latitude, longitude }) => {
        if (propsMarkers.length <= 0) {
          return acc;
        }

        acc.latitude += latitude / propsMarkers.length;
        acc.longitude += longitude / propsMarkers.length;
        return acc;
      },
      { latitude: 0, longitude: 0 },
    );

    return meanCenter;
  }, [propsMarkers]);

  // 업데이트
  const refreshLocation = useCallback(() => {
    const latlng = mapRef.current.getCenter();
    const lat = latlng.getLat();
    const lng = latlng.getLng();

    const level = mapRef.current.getLevel();

    dispatch(mapActions.setCenter({ latitude: lat, longitude: lng }));
    dispatch(mapActions.setRadiusByLevel(level));
  }, [dispatch]);

  // 현재 GPS 위치로 이동
  const updateCurrentGPSPos = useCallback(() => {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const moveLatLon = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        );

        mapRef.current.setCenter(moveLatLon);
        dispatch(
          mapActions.setCenter({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        );
      });
    }
  }, [mapRef, dispatch]);

  /**
   * 마커 표시
   */
  const displayMarker = useCallback(
    (latlngPosition, storeName, density, storeId) => {
      let imageSrc = "https://ifh.cc/g/YB8asG.png";

      if (density >= 75) imageSrc = "https://ifh.cc/g/YB8asG.png";
      else if (density >= 50) imageSrc = "https://ifh.cc/g/51onOY.png";
      else if (density >= 25) imageSrc = "https://ifh.cc/g/wtKDAg.png";
      else if (density >= 0) imageSrc = "https://ifh.cc/g/a5KAGn.png";
      else imageSrc = "https://ifh.cc/g/rqCy80.png";

      const imageSize = new kakao.maps.Size(50, 70);
      const imageOption = { offset: new kakao.maps.Point(27, 69) };

      const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption,
        ),
        markerPosition = latlngPosition;

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(mapRef.current);

      let iwContent = '<div style="padding:5px">' + storeName + "</div>";

      if (!storeName) {
        return;
      }

      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });

      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(mapRef.current, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      kakao.maps.event.addListener(marker, "click", function () {
        navigate(`/detail/${storeId}`);
      });
    },
    [mapRef, navigate],
  );

  /**
   * 초기화
   */
  useEffect(() => {
    const meanPos = getMeanCenterOfMarkers();
    const { latitude, longitude } =
      searchKeyword && isSearched
        ? meanPos
        : Object.keys(center).length > 0
        ? center
        : getMeanCenterOfMarkers();

    let container = document.getElementById("map"),
      options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: level,
      };

    mapRef.current = new kakao.maps.Map(container, options);

    const markers = [...propsMarkers, center];
    for (const marker of markers) {
      const { latitude, longitude, storeName, density, storeId } = marker;
      const position = new kakao.maps.LatLng(latitude, longitude);
      displayMarker(position, storeName, density, storeId);
    }

    return () => {};
  }, [
    center,
    propsMarkers,
    level,
    mapRef,
    displayMarker,
    getMeanCenterOfMarkers,
    updateCurrentGPSPos,
    isSearched,
    searchKeyword,
  ]);

  // 줌인
  const zoomIn = () => {
    mapRef.current.setLevel(mapRef.current.getLevel() - 1);
  };

  // 줌아웃
  const zoomOut = () => {
    mapRef.current.setLevel(mapRef.current.getLevel() + 1);
  };

  return (
    <StyledMapContainer id="map" {...props}>
      <MapButton
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        refreshLocation={refreshLocation}
        updateCurrentPos={updateCurrentGPSPos}
      />
    </StyledMapContainer>
  );
};

const StyledMapContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-top: ${(props) => props.marginTop};
`;

MapContainer.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  marginBottom: PropTypes.string,
  markers: PropTypes.array,
  center: PropTypes.object,
  isSearched: PropTypes.bool,
};

MapContainer.defaultProps = {
  width: "100vw",
  height: "100vh",
  marginTop: "80px",
  markers: [],
  isSearched: false,
};

export default MapContainer;
