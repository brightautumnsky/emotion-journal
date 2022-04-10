import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Emotion from "./Emotion";
import { JournalDispatchContext } from "../App";

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
    .content-box {
      width: 100%;
      display: flex;
      justify-content: center;
      textarea {
        width: 100%;
        resize: none;
        border: none;
        background: #ececec;
        min-height: 300px;
        &:focus {
          outline: none;
        }
      }
    }
    .btn-box {
      display: flex;
      justify-content: space-between;
      padding: 30px 0;
    }
  }
`;

const JournalEditor = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  // 일기 감정 상태
  const [emotion, setEmotion] = useState(null);
  // 일기 내용 상태
  const [content, setContent] = useState("");
  const contentRef = useRef();
  const { onCreate } = useContext(JournalDispatchContext);

  // 감정 변화
  const onClickEmotion = (emotion) => {
    setEmotion(emotion);
  };
  // 일기 내용 변화
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  // 일기 내용 저장
  const onSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return alert("입력해주세요!");
    }

    console.log(date);
    console.log(emotion);
    console.log(content);
    onCreate(date, content, emotion);
    // 일기 작성 페이지로 뒤로가기를 해서 다시 못 오게 막기
    navigate("/", { replace: true });
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
      </section>
      <section>
        <h4>오늘의 감정은 어떠세요?</h4>
        <div className="emotion-box">
          {emotionList.map((em, index) => (
            <Emotion
              key={index}
              emotion={emotion}
              id={em.id}
              img={em.img}
              des={em.des}
              onClick={onClickEmotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>오늘은 어떤 일이 일어났나요?</h4>
        <div className="content-box">
          <textarea onChange={onChangeContent} ref={contentRef} />
        </div>
      </section>
      <section>
        <div className="btn-box">
          <Button text="취소" onClick={() => navigate(-1)} />
          <Button text="저장" onClick={onSubmit} />
        </div>
      </section>
    </StyledJournalEditor>
  );
};

export default JournalEditor;
