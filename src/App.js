import "./App.css";
import React, { useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Journal from "./Pages/Journal";
import Edit from "./Pages/Edit";
import New from "./Pages/New";
import Button from "./Components/Button";
import Header from "./Components/Header";
import RouteLinkTest from "./Components/RouteLinkTest";

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      newState = [...state, action.data];
      break;
    case "DELETE":
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    case "EDIT":
      newState = state.map((item) =>
        item.id === action.data.id ? { ...action.data } : item
      );
      break;
    default:
      return state;
  }
  return newState;
};

export const JournalStateContext = React.createContext();
export const JournalDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onDelete = (targetId) => {
    dispatch({ type: "DELETE", targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: { id: targetId, date: new Date(date).getTime(), content, emotion },
    });
  };

  return (
    <JournalStateContext.Provider value={data}>
      <JournalDispatchContext.Provider value={{ onCreate, onDelete, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Header
              text="header"
              leftChild={
                <Button
                  text="left"
                  type="positive"
                  onClick={() => alert("left")}
                />
              }
              rightChild={
                <Button text="right" onClick={() => alert("right")} />
              }
            />
            {/* 라우팅 */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/journal/:id" element={<Journal />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
            </Routes>
            <RouteLinkTest />
          </div>
        </BrowserRouter>
      </JournalDispatchContext.Provider>
    </JournalStateContext.Provider>
  );
}

export default App;
