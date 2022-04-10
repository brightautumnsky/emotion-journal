import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const StyledJournal = styled.div`
  padding: 12px 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .emotionBox {
    width: 120px;
    display: flex;
    justify-content: center;
    background-color: #ffb02e;
    border-radius: 6px;
    .emotionImg {
      width: 60px;
      height: 60px;
      background-color: #ffb02e;
    }
  }
  /* 이미지마다 색이 다를 경우를 위해 클래스 나누기 */
  .emotionBox--5 {
  }
  .journalMainBox {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    flex: 2;
    padding-left: 20px;
    & > div + div {
      margin-top: 10px;
    }
    .journalContent {
      padding-left: 3px;
    }
  }
  .journalDate {
    span {
      background: #efefef;
      padding: 3px 6px;
      border-radius: 3px;
    }
  }
  @media screen and (max-width: 650px) {
    .journalDate {
      span {
        font-size: 12px;
      }
    }
  }
`;

const Journal = ({ id, date, emotion, content }) => {
  const targetDate = new Date(date);
  const targetEmotion = process.env.PUBLIC_URL + `assets/${emotion}.png`;
  const navigate = useNavigate();

  // id 값으로 네비게이트
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <StyledJournal>
      <div className={["emotionBox", `emotionBox--${emotion}`].join(" ")}>
        <img
          className="emotionImg"
          src={targetEmotion}
          alt={`emotion-${emotion}`}
        />
      </div>
      <div className="journalMainBox">
        <div className="journalDate" onClick={goDetail}>
          <span>
            {`${targetDate.getFullYear()}년 
          ${targetDate.getMonth() + 1}월 
          ${targetDate.getDate()}일`}
          </span>
        </div>
        <div className="journalContent">{content}</div>
      </div>
      <Button text="수정" onClick={goEdit}></Button>
    </StyledJournal>
  );
};

export default Journal;
