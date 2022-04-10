import React, { useState, useContext, useEffect } from "react";
import { JournalStateContext } from "../App";
import Header from "../Components/Header";
import Button from "../Components/Button";
import JournalList from "../Components/JournalList";

const Home = () => {
  // 날짜
  const [currentDate, setCurrentDate] = useState(new Date());
  const journalList = useContext(JournalStateContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (journalList.length >= 1) {
      // 첫 날
      const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getTime();

      // 마지막 날
      const lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getTime();

      // 날짜에 따른 일기 필터링
      setData(
        journalList.filter(
          (item) => firstDay <= item.date && item.date <= lastDay
        )
      );
    }
  }, [journalList, currentDate]);

  const headerDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월`;

  const increaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      )
    );
  };

  const decreaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      )
    );
  };

  return (
    <div>
      <Header
        text={headerDate}
        leftChild={<Button text="지난달" onClick={decreaseMonth} />}
        rightChild={<Button text="다음달" onClick={increaseMonth} />}
      />
      <JournalList journalList={data} />
    </div>
  );
};

export default Home;
