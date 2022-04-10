import React from "react";
import styled, { css } from "styled-components";

const btnTypes = {
  positive: {
    color: "seagreen",
  },
  default: {
    color: "#ececec",
  },
  negative: {
    color: "red",
  },
};

const StyledButton = styled.button`
  font-family: "Black Han Sans", sans-serif;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  font-size: 18px;
  white-space: nowrap;

  /* type별 배경색 지정 */
  ${({ type }) =>
    type &&
    css`
      background-color: ${btnTypes[type].color};
    `}
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
