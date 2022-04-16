import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Emotion from "./Emotion";
import { JournalDispatchContext } from "../App";
import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

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

const JournalEditor = ({ isEdit, journal }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  // 일기 감정 상태
  const [emotion, setEmotion] = useState(null);
  // 일기 내용 상태
  const [content, setContent] = useState("");
  const contentRef = useRef();
  const { onCreate, onEdit } = useContext(JournalDispatchContext);
  // 수정 모드 상태
  const [editState, setEditState] = useState(false);

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

    if (!emotion) {
      return alert("감정을 선택해주세요!");
    }

    if (!isEdit) {
      onCreate(date, content, emotion);
    } else {
      onEdit(journal.id, date, content, emotion);
    }

    // 일기 작성 페이지로 뒤로가기를 해서 다시 못 오게 막기
    navigate("/", { replace: true });
  };

  const [date, setDate] = useState(getStringDate(new Date()));

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    // 수정 모드일 경우
    if (isEdit) {
      // 날짜를 targetJournal로
      setDate(getStringDate(new Date(parseInt(journal.date))));
      setEmotion(journal.emotion);
      setContent(journal.content);

      // 수정
      setEditState(true);
    }
  }, [isEdit, journal]);

  return (
    <StyledJournalEditor>
      <Header
        text={!isEdit ? "감정 일기 작성" : "감정 일기 수정"}
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
              id={em.e_id}
              img={em.e_img}
              des={em.e_des}
              onClick={onClickEmotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>오늘은 어떤 일이 일어났나요?</h4>
        <div className="content-box">
          <textarea
            value={content}
            onChange={onChangeContent}
            ref={contentRef}
          />
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
