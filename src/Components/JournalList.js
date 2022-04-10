import React from "react";

const JournalList = ({ journalList }) => {
  return (
    <div>
      {journalList.map((journal) => (
        <div>{journal.content}</div>
      ))}
    </div>
  );
};

JournalList.defaultProps = {
  journalList: [],
};

export default JournalList;
