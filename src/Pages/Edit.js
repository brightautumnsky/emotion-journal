import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { JournalStateContext } from "../App";
import JournalEditor from "../Components/JournalEditor";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const journalList = useContext(JournalStateContext);
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    if (journalList.length >= 1) {
      const targetJournal = journalList.find(
        (journal) => parseInt(journal.id) === parseInt(id)
      );

      // 경로가 정상일 때
      if (targetJournal) {
        setJournal(targetJournal);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, journalList, journal]);

  return (
    <div>{journal && <JournalEditor isEdit={true} journal={journal} />}</div>
  );
};

export default Edit;
