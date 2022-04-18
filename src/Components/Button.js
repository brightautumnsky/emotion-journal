import React from "react";
import styled, { css } from "styled-components";

const btnTypes = {
  positive: {
    color: "#FFEEEE",
  },
  default: {
    color: "#F7E9D7",
  },
  negative: {
    color: "pink",
  },
};

const StyledButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  font-size: 16px;
  white-space: nowrap;

  /* type별 배경색 지정 */
  ${({ type }) =>
    type &&
    css`
      background-color: ${btnTypes[type].color};
    `}

  @media screen and (max-width: 650px) {
    font-size: 13px;
  }
`;

const Button = ({ type, text, onClick }) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {text}
    </StyledButton>
  );
};

Button.defaultProps = {
  type: "default",
};

export default Button;
