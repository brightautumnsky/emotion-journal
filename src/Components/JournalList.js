import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ControlMenu from "../Components/ControlMenu";
import Button from "../Components/Button";
import Journal from "./Journal";

const StyledJournalList = styled.div`
  padding: 30px 0 30px 0;
  .menuContainer {
    display: flex;
  }
  .journalContainer {
    margin-top: 30px;
    border-bottom: 1px solid lightgray;
    & + & {
      margin-top: 12px;
    }
  }
  .menuEmptyBox {
    flex: 1;
  }
`;

const sortList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterList = [
  { value: "all", name: "전부" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "나쁜 감정만" },
];

const JournalList = ({ journalList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filterType, setFilterType] = useState("all");

  // 정렬된 일기 리스트를 리턴하는 함수
  const getComputedJournalList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //   json화 시킨 후 다시 parse
    const copyList = JSON.parse(JSON.stringify(journalList));

    // 감정으로 필터링하는 함수
    const getFilteredEmotion = (journal) => {
      if (filterType === "good") {
        return parseInt(journal.emotion) >= 3;
      } else {
        return parseInt(journal.emotion) < 3;
      }
    };

    const filteredList =
      filterType === "all"
        ? copyList
        : copyList.filter((journal) => getFilteredEmotion(journal));

    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <StyledJournalList>
      <div className="menuContainer">
        <ControlMenu
          value={sortType}
          onChange={setSortType}
          optionList={sortList}
        />
        <ControlMenu
          value={filterType}
          onChange={setFilterType}
          optionList={filterList}
        />
        <div className="menuEmptyBox"></div>
        {/* 네비게이트 설정 */}
        <Button type="positive" text="작성" onClick={() => navigate("/new")} />
      </div>
      {getComputedJournalList().map((journal) => (
        <div className="journalContainer">
          <Journal
            id={journal.id}
            content={journal.content}
            date={journal.date}
            emotion={journal.emotion}
          />
        </div>
      ))}
    </StyledJournalList>
  );
};

JournalList.defaultProps = {
  journalList: [],
};

export default JournalList;
