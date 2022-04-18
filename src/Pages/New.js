import React, { useEffect } from "react";
import JournalEditor from "../Components/JournalEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "감정 일기 쓰기";
  }, []);

  return (
    <div>
      <JournalEditor />
    </div>
  );
};

export default New;
