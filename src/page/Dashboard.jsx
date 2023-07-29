import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "styled-components";
import Icon from "../component/Icon";
import Header from "../container/Header";
import MapContainer from "../container/MapContainer";
import { useAppSelector } from "../store/Hooks";
import { useNearStores } from "../utils/hooks/useDashboard";
import { useSearchQuery } from "../utils/hooks/useSearch";

const Container = styled.div`
  position: relative;
`;

const StyledIcon = styled.div`
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Box = styled.div`
  position: fixed;
  display: flex;
  overflow-y: auto;
  z-index: 20;

  left: 20px;
  top: 100px;
  width: 350px;
  height: 820px;

  background-color: #ffffff;

  border-radius: 20px;
  border-style: solid;
  border-width: 2px;
  border-color: #bbbbbb;

  box-shadow: 0px 0px 30px 0px rgb(0, 0, 0, 0.25);

  flex-direction: row;
`;

const TitleSpace = styled.div`
  height: 50px;
`;

const LeftWhiteSpace = styled.div`
  margin: 0 10px;
  cursor: pointer;
`;

const MarketList = styled.div`
  height: 250px;
  margin: 0 0 26px 0;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 25px 0;
`;

const StoreTitle = styled.h2`
  margin: 10px 0 5px 0;
  font-size: 20px;
  font-weight: bold;
`;

const PopGroup = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
`;

const PopDen = styled.div`
  width: 65px;
`;

const PopDenText = styled.h4`
  width: 100%;
  padding: 2px 0 0 0;
  font-size: 14px;
  color: ${(props) => props.color || "black"};
  font-weight: bold;
`;

const StyledImage = styled.div`
  width: 330px;
  height: 200px;
  display: block;
  background-image: url(${(props) => props.thumurl});
  background-color: #ebebeb;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Image = ({ thumUrl }) => {
  return <StyledImage thumurl={thumUrl} />;
};

export const DashboardPage = () => {
  const { searchKeyword } = useAppSelector((store) => store.search);
  const { center, radius } = useAppSelector((state) => state.map);
  const { latitude, longitude } = center;
  const isSearched = useRef(false);
  const theme = useTheme();

  const { isLoading, data: nearStores } = useNearStores({
    radius,
    latitude,
    longitude,
  });

  const { isLoading: isSearchLoading, data: searchResult } =
    useSearchQuery(searchKeyword);

  const navigate = useNavigate();

  if (isLoading) {
    isSearched.current = false;
    return "로딩중";
  }

  if (isSearchLoading) {
    return "로딩중";
  }

  if (searchResult) {
    isSearched.current = true;
  }

  const stores = searchKeyword ? searchResult : nearStores;
  const positions = stores.map(
    ({ latitude, longitude, storeName, density, storeId }) => ({
      latitude,
      longitude,
      storeName,
      density,
      storeId,
    }),
  );

  const handleOnClickStore = (storeId) => {
    console.log("clicked");
    navigate(`/detail/${storeId}`);
  };

  const calculatePop = (density) => {
    if (density >= 75) return "매우 혼잡";
    else if (density < 75 && density >= 50) return "혼잡";
    else if (density < 50 && density >= 25) return "보통";
    else return "원활";
  };

  const calculatePopColor = (density) => {
    if (density >= 75) return theme.colors.mainRed;
    else if (density < 75 && density >= 50) return theme.colors.mainRed;
    else if (density < 50 && density >= 25) return theme.colors.mainYellow;
    else return theme.colors.mainGreen;
  };

  const StoresComponent = () => {
    const ret = stores.map(({ storeId, storeName, thumUrl, density }) => {
      return (
        <LeftWhiteSpace
          key={storeId}
          onClick={() => handleOnClickStore(storeId)}
        >
          <MarketList>
            <Image thumUrl={thumUrl} />
            <StoreTitle>{storeName}</StoreTitle>
            <PopGroup>
              <PopDen>
                <Icon.Pop />
              </PopDen>
              <PopDenText>
                <PopDenText color={calculatePopColor(density)}>
                  {calculatePop(density)}
                </PopDenText>
              </PopDenText>
              <PopDen>
                <Icon.Density />
              </PopDen>
              <PopDenText>밀집도 {density}%</PopDenText>
            </PopGroup>
          </MarketList>
        </LeftWhiteSpace>
      );
    });

    const NoDataText = () => {
      return (
        <LeftWhiteSpace>
          <MarketList>
            <span>검색결과가 없어요.</span>
          </MarketList>
        </LeftWhiteSpace>
      );
    };

    return ret.length > 0 ? ret : <NoDataText />;
  };

  return (
    <Container>
      <Header />
      <Box>
        <StyledIcon>
          <LeftWhiteSpace>
            <TitleSpace>
              <Title>
                {searchKeyword
                  ? `"${searchKeyword}" 검색결과`
                  : "내 근처에 위치한 가게"}
              </Title>
            </TitleSpace>
          </LeftWhiteSpace>
          <StoresComponent />
        </StyledIcon>
      </Box>
      <MapContainer markers={positions} isSearched={isSearched.current} />
    </Container>
  );
};
