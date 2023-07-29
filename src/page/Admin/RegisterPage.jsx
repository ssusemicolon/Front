import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "styled-components";
import { RoundedButton } from "../../component/RoundedButton";
import { Spacing } from "../../component/Spacing";
import { Text } from "../../component/Text";
import { Layout } from "../../container/Admin/Layout";
import Header from "../../container/Header";
import { useStoreRegisterMutation } from "../../utils/hooks/useAdmin";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  font-size: 20px;
`;

const HStack = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  // border: 1px solid blue;
  width: 100%;
  gap: 2rem;

  flex: 1;
`;

const StyledBorderInput = styled.input`
  flex: 1;

  border-radius: 6px;
  padding: 0.2rem 0.5rem;
  font-size: 0.7em;
  border: 1px solid ${(props) => props.theme.colors.mainGray};
  ${(props) => props.width && `width: ${props.width}`};
`;

const StyledTextWrapper = styled.div`
  flex: 1;
  // border: 1px solid red;
  justify-content: flex-end;
  text-align: right;
`;

const StyledButtonGroup = styled.div`
  flex: 1;
  gap: 0.2rem;
  // border: 1px solid blue;
  display: flex;
  justify-content: space-around;
`;

const RoundButton = styled.button`
  border-radius: 50%;

  border: 1px solid
    ${(props) =>
      props.isselected === "OPEN" ? props.theme.colors.mainBlack : "white"};
  background-color: ${(props) =>
    props.isselected === "OPEN" ? props.theme.colors.mainBlack : "none"};
  color: ${(props) =>
    props.isselected
      ? props.theme.colors.mainWhite
      : props.theme.colors.mainBlack};
`;

const RadioInput = styled.input`
  vertical-align: middle;
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;

  &:checked {
    accent-color: "black";
    border: 0.4em solid ${(props) => props.theme.colors.mainBlack};
  }
`;

export const RegisterPage = () => {
  const theme = useTheme();
  const { mutate: doRegister } = useStoreRegisterMutation();
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(true);

  const simpleInputTitles = [
    { title: "업체명", key: "storeName" },
    { title: "도로명주소", key: "address" },
    { title: "위도", key: "latitude" },
    { title: "경도", key: "longitude" },
    { title: "고객용 좌석 개수", key: "seatCount" },
    { title: "이미지", key: "thumUrl" },
  ];

  const [storeForm, setStoreForm] = useState({
    storeName: "",
    thumUrl: "",
    seatCount: 0,
    password: "",
    address: "",
    latitude: "", // 등록할 매장의 위도 ex) 37.494705526855
    longitude: "", // 등록할 매장의 경도 ex) 126.95994559383
    openBusinessHour: "", // 등록할 매장의 영업 시작 시간. 0부터 24까지의 숫자 입력
    closeBusinessHour: "", // 등록할 매장의 영업 종료 시간 0부터 24까지의 정수 범위
  });

  const [businessDays, setBusinessDays] = useState({
    일: "OPEN",
    월: "OPEN",
    화: "OPEN",
    수: "OPEN",
    목: "OPEN",
    금: "OPEN",
    토: "OPEN",
  });

  console.log(storeForm);

  const handleChangeInput = (key, value) => {
    setStoreForm({ ...storeForm, [key]: value });
  };

  const handleSubmit = () => {
    const result = Object.values(businessDays);
    const form = { ...storeForm, businessDays: [...result] };

    doRegister(form, {
      onSuccess: () => {
        console.log("success!");
        navigate("/admin/register/result");
      },
      onError: (e) => {
        console.log("error!", e);
        window.alert("에러가 발생했습니다. ", e);
      },
    });
  };

  /** 영업일 선택 */
  const OpenDaysButton = () => {
    const handleChangeDays = (title) => {
      const updateDay = businessDays[title] === "OPEN" ? "CLOSED" : "OPEN";
      setBusinessDays({ ...businessDays, [title]: updateDay });
    };

    return (
      <StyledButtonGroup>
        {Object.keys(businessDays).map((title) => {
          const isOpen = businessDays[title];

          return (
            <RoundButton
              key={title}
              isselected={isOpen}
              onClick={() => handleChangeDays(title)}
            >
              <Text
                key={title}
                color={
                  isOpen === "OPEN"
                    ? theme.colors.mainWhite
                    : theme.colors.mainBlack
                }
              >
                {title}
              </Text>
            </RoundButton>
          );
        })}
      </StyledButtonGroup>
    );
  };

  return (
    <>
      <Header />
      <Spacing spacing={"40px"} />
      <Layout>
        <StyledForm>
          <Text fontSize={theme.fontSize.lg} fontWeight={"600"}>
            신규장소등록
          </Text>
          <Text color={theme.colors.mainGray} fontSize={theme.fontSize.xs}>
            신규 장소를 등록하기 전 다음의 이용 방법을 확인하신 후 이용
            바랍니다.
          </Text>
          {simpleInputTitles.map(({ title, key }) => {
            return (
              <HStack key={key}>
                <StyledTextWrapper>
                  <Text>{title}</Text>
                </StyledTextWrapper>
                <StyledBorderInput
                  onChange={(e) =>
                    handleChangeInput(key, e.currentTarget.value)
                  }
                />
              </HStack>
            );
          })}
          <HStack>
            <HStack>
              <Text>영업 시작 시간</Text>
              <StyledBorderInput
                type="number"
                width={"1px"}
                onChange={(e) =>
                  handleChangeInput("openBusinessHour", e.currentTarget.value)
                }
              />
              <Text>종료</Text>
              <StyledBorderInput
                type="number"
                width={"1px"}
                onChange={(e) =>
                  handleChangeInput("closeBusinessHour", e.currentTarget.value)
                }
              />
            </HStack>
          </HStack>
          <HStack>
            <StyledTextWrapper>
              <Text style={{ flex: 1 }}>영업일</Text>
            </StyledTextWrapper>
            <OpenDaysButton />
          </HStack>
          <Spacing spacing={"0.5rem"} />
          <Text fontSize={theme.fontSize.lg} fontWeight={"600"}>
            매장 내 CCTV 연동 동의 여부
          </Text>
          <Text color={theme.colors.mainGray} fontSize={theme.fontSize.sm}>
            CCTV 연동에 동의하지 않을 시, 매장 등록이 어려울 수 있습니다.
          </Text>
          <HStack>
            <HStack style={{ justifyContent: "center" }}>
              <RadioInput type="radio" name="agree" />
              <Text>예</Text>
            </HStack>
            <HStack style={{ justifyContent: "center" }}>
              <RadioInput type="radio" name="agree" />
              <Text>아니오</Text>
            </HStack>
          </HStack>
          <Spacing spacing={"0.5rem"} />

          <HStack>
            <StyledTextWrapper>
              <Text>등록 비밀번호</Text>
            </StyledTextWrapper>
            <StyledBorderInput
              onChange={(e) =>
                handleChangeInput("password", e.currentTarget.value)
              }
            />
          </HStack>
          <Text color={theme.colors.mainGray} fontSize={theme.fontSize.sm}>
            추후 장소에 대한 수정/삭제가 필요할 때 사용됩니다.
          </Text>

          <Spacing spacing={"0.5rem"} />
          <RoundedButton onClick={handleSubmit}>
            <Text color={theme.colors.mainWhite}>등록하기</Text>
          </RoundedButton>
        </StyledForm>
      </Layout>
    </>
  );
};
