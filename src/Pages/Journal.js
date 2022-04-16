import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import { JournalStateContext } from "../App";
import Button from "../Components/Button";
import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

const JournalWrapper = styled.div`
  padding: 30px;
  h4 {
    text-align: center;
  }
  .journal-img {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: 0 auto;
    padding: 30px 0 50px 0;
  }
  .journal-img-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 150px;
    height: 200px;
    background: #ffb02e;
    img {
    }
    p {
      font-weight: 800;
      text-align: center;
    }
  }

  .journal-content {
    padding: 12px 0;
    word-break: keep-all;
    overflow-wrap: break-word;
    p {
      background: #ececec;
      padding: 24px;
      box-sizing: border-box;
      text-align: justify;
      margin: 0 auto;
      line-height: 2.5;
    }
  }
`;

const Journal = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const journalList = useContext(JournalStateContext);
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState(null);

  useEffect(() => {
    if (journalList.length >= 1) {
      const targetJournal = journalList.find(
        (journal) => parseInt(journal.id) === parseInt(id)
      );

      if (targetJournal) {
        setJournal(targetJournal);
      } else {
        alert("존재하지 않는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, journalList]);

  if (!journal) {
    return <div>로딩중 입니다...</div>;
  } else {
    const targetEmotion = emotionList.find(
      (em) => parseInt(em.e_id) === parseInt(journal.emotion)
    );

    return (
      <JournalWrapper>
        <Header
          text={`${getStringDate(new Date(journal.date))}에 있었던 일`}
          leftChild={<Button text="앞으로" onClick={() => navigate(-1)} />}
          rightChild={
            <Button
              text="수정"
              onClick={() => navigate(`/edit/${journal.id}`)}
            />
          }
        />
        <article>
          <section>
            <div className="journal-img">
              <h4>그날의 감정</h4>
              <div className="journal-img-box">
                <img
                  src={targetEmotion.e_img}
                  alt={`emotion-${targetEmotion.e_id}`}
                />
                <p>{targetEmotion.e_des}</p>
              </div>
            </div>
            <div className="journal-content">
              <p>{journal.content}</p>
            </div>
          </section>
        </article>
      </JournalWrapper>
    );
  }
};

export default Journal;
