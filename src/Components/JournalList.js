import React, { useState } from "react";

const sortList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((opt, id) => (
        <option value={opt.value} key={id}>
          {opt.name}
        </option>
      ))}
    </select>
  );
};

const JournalList = ({ journalList }) => {
  const [sortType, setSortType] = useState("latest");

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
    const sortedList = copyList.sort(compare);

    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortList}
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
