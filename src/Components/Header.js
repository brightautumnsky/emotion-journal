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
  .header-left {
    width: 25%;
    justify-content: start;
  }
  .header-right {
    width: 25%;
    justify-content: end;
  }
  .header-text {
    width: 50%;
    font-size: 21px;
    justify-content: center;
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const Header = ({ text, leftChild, rightChild }) => {
  return (
    <StyledHeader>
      <div className="header-left">{leftChild}</div>
      <div className="header-text">{text}</div>
      <div className="header-right">{rightChild}</div>
    </StyledHeader>
  );
};

export default Header;
