import { styled } from "styled-components";
import Header from "../container/Header";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
`;

const SplashBox = styled.div`
  position: fixed;
  display: flex;

  top: 80px;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const TextBox = styled.div`
  width: 100%;
  height: 40%;
  background-color: #ffffff;
  text-align: center;
  padding: 100px 0;
  line-height: 60px;
`;

const TitleText = styled.h2`
  font-size: 35px;
  color: #2b2d42;
`;

const MidiumText = styled.h3`
  font-size: 30px;
  color: #2b2d42;
  font-weight: lighter;
`;

const MiniText = styled.h5`
  font-size: 17px;
  color: #80818e;
  text-decoration: underline;
  cursor: pointer;
`;

const ImageBox = styled.div`
  height: 55%;
  text-align: center;

  background-image: url("https://ifh.cc/g/0AQqn9.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: block;
`;

const SplashButton = styled.button`
  position: relative;
  top: 70%;
  width: 250px;
  height: 45px;

  background-color: #ffffff;

  border-radius: 100px;
  border-style: solid;
  border-width: 2px;
  border-color: #bbbbbb;

  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
`;

const ButtonText = styled.div`
  font-size: 20px;
  text-align: center;
  font-family: sans-serif;
  color: #2b2d42;
`;

export const SplashPage = () => {
  const navigate = useNavigate();

  const clickBtnDashboard = () => {
    navigate(`/`);
  };

  const clickBtnRegister = () => {
    navigate(`/admin/register`);
  };

  return (
    <Container>
      <Header />
      <SplashBox>
        <TextBox>
          <MidiumText>자리있슈</MidiumText>
          <TitleText>CCTV 이용 식당, 카페 밀집도 계산 및 시각화</TitleText>
          <MiniText onClick={clickBtnRegister}>
            가게 사장님이라면? 이곳에서 장소 등록하기↗
          </MiniText>
        </TextBox>
        <ImageBox>
          <backgroundImg />
          <SplashButton onClick={clickBtnDashboard}>
            <ButtonText>서비스 바로가기</ButtonText>
          </SplashButton>
        </ImageBox>
      </SplashBox>
    </Container>
  );
};
