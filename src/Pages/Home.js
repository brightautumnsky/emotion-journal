import React, { useState } from "react";
import Header from "../Components/Header";
import Button from "../Components/Button";

const Home = () => {
  // 날짜
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(currentDate);

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
      <h1>Home</h1>
    </div>
  );
};

export default Home;
