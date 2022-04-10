import React, { useEffect, useState } from "react";
import ControlMenu from "../Components/ControlMenu";

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
    <div>
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
      {getComputedJournalList().map((journal) => (
        <div key={journal.id}>{journal.content}</div>
      ))}
    </div>
  );
};

JournalList.defaultProps = {
  journalList: [],
};

export default JournalList;
