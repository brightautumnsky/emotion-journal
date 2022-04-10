import React from "react";
import styled, { css } from "styled-components";

const StyledEmotion = styled.div`
  background: #ffb02e;
  box-sizing: border-box;
  padding: 24px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  img {
    width: 50px;
  }
  p {
    font-weight: 900;
    font-size: 20px;
  }

  ${({ active }) =>
    active &&
    css`
      background: lightcoral;
    `}

  @media screen and (max-width: 650px) {
    padding: 12px;
    margin: 12px;
    img {
      width: 30px;
    }
  }
`;

const Emotion = ({ id, img, des, emotion, onClick }) => {
  return (
    <StyledEmotion active={id === emotion} onClick={() => onClick(id)}>
      <img src={img} alt={`emotin-${id}`} />
      <p>{des}</p>
    </StyledEmotion>
  );
};

export default Emotion;
