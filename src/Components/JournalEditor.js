import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Emotion from "./Emotion";

const emotionList = [
  { id: 1, img: process.env.PUBLIC_URL + "assets/1.png", des: "행복" },
  { id: 2, img: process.env.PUBLIC_URL + "assets/2.png", des: "기쁨" },
  { id: 3, img: process.env.PUBLIC_URL + "assets/3.png", des: "무난" },
  { id: 4, img: process.env.PUBLIC_URL + "assets/4.png", des: "차분" },
  { id: 5, img: process.env.PUBLIC_URL + "assets/5.png", des: "슬픔" },
];

const StyledJournalEditor = styled.div`
  section {
    .input-box {
      background: #ececec;
      padding: 10px 18px;
      border-radius: 6px;
      border: none;
      &:focus {
        outline: none;
      }
    }
    .emotion-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

const JournalEditor = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [emotion, setEmotion] = useState(null);

  // 감정 변화
  const onClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  // 날짜 변환 함수
  const getStringDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    // date 객체를 -로 나누는 string으로 변경
    return [year, month, day].join("-");
  };

  const [date, setDate] = useState(getStringDate(new Date()));

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  return (
    <StyledJournalEditor>
      <Header
        text="감정 일기 작성"
        leftChild={<Button text="앞으로" onClick={goBack} />}
      />
      <section>
        <h4>오늘은 언제인가요?</h4>
        <input
          className="input-box"
          type="date"
          onChange={onChangeDate}
          value={date}
        />
        <section>
          <div className="emotion-box">
            {emotionList.map((em) => (
              <Emotion
                emotion={emotion}
                id={em.id}
                img={em.img}
                des={em.des}
                onClick={onClickEmotion}
              />
            ))}
          </div>
        </section>
      </section>
    </StyledJournalEditor>
  );
};

export default JournalEditor;
