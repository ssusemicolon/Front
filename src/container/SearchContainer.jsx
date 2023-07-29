import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Icon from "../component/Icon";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import { searchActions } from "../store/ducks/searchSlice";

const StyledIcon = styled.div`
  svg {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
  }
`;

const HeaderForm = styled.form`
  display: flex;
  max-width: 100%;
  width: 100%;
  height: 40px;
  padding: 0 6px;
  border: 1px solid #8f8f8f;
  border-radius: 10px;
  margin-left: 0%;
`;

const HeaderInputText = styled.input`
  width: 100%;
  border: none;
  outline: none;
  // height: 40px;
  // padding: 0 6px;
  // border: 1px solid #8f8f8f;
  // border-radius:10px;
  // margin-Left: 0%;
`;

const HeaderInputButton = styled.button`
  width: 60px;
  height: 40px;
  padding: 0 6px;
`;

export const SearchContainer = () => {
  const dispatch = useAppDispatch();
  const { searchKeyword } = useAppSelector((store) => store.search);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const [query, setQuery] = useState(searchKeyword || "");

  useEffect(() => {
    if (searchInputRef?.current) {
      searchInputRef.current.focus();
    }
  }, [searchInputRef]);

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(searchActions.setQuery(query));
    navigate("/");
  };

  return (
    <HeaderForm onSubmit={handleSubmit}>
      <StyledIcon>
        <HeaderInputButton>
          <Icon.Search />
        </HeaderInputButton>
      </StyledIcon>
      <HeaderInputText
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        ref={searchInputRef}
      />
    </HeaderForm>
  );
};
