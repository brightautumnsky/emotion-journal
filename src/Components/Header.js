import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 20px 0 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ececec;

  & > div {
    display: flex;
  }
  .header__left {
    width: 25%;
    justify-content: start;
  }
  .header__right {
    width: 25%;
    justify-content: end;
  }
  .header__text {
    width: 50%;
    font-size: 21px;
    justify-content: center;
  }
`;

const Header = ({ text, leftChild, rightChild }) => {
  return (
    <StyledHeader>
      <div className="header__left">{leftChild}</div>
      <div className="header__text">{text}</div>
      <div className="header__right">{rightChild}</div>
    </StyledHeader>
  );
};

export default Header;
