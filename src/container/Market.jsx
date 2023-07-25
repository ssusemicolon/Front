import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px;
  margin-left:50%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const type = styled.h3`
font-size: 12px;
`;
const Subtitle = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
`;

const Info = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Market = () => {
  const [storeInfo, setStoreInfo] = useState({
    name: '',
    category: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    // 서버에서 가게 정보를 받아오는 함수를 가정하고, 데이터를 storeInfo에 저장한다고 가정
    const dataFromServer = {
      name: '하우스무드 숭실대점',
      category: '',
      address: '서울 동작구 삼도로61길 72 B101호',
      phone: '02-6401-0504',
    };
    setStoreInfo(dataFromServer);
  }, []);

  return (
    <Container>
      <Title>{storeInfo.name}</Title>
      <type>{storeInfo.Category}</type>
      <Subtitle></Subtitle>
      <Info>{storeInfo.address}</Info>
      <Subtitle></Subtitle>
      <Info>{storeInfo.phone}</Info>
    </Container>
  );
};

export default Market;