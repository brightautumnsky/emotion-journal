import "./App.css";
import React, { useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Journal from "./Pages/Journal";
import Edit from "./Pages/Edit";
import New from "./Pages/New";

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

const testData = [
  { id: 1, emotion: 1, content: "test1: 일기", date: 1649579846175 },
  { id: 2, emotion: 2, content: "test2: 일기", date: 1649579846176 },
  { id: 3, emotion: 3, content: "test3: 일기", date: 1649579846177 },
  { id: 4, emotion: 4, content: "test4: 일기", date: 1649579846178 },
  { id: 5, emotion: 5, content: "test5: 일기", date: 1649579846179 },
];

function App() {
  const [data, dispatch] = useReducer(reducer, testData);

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
            {/* 라우팅 */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/journal/:id" element={<Journal />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </JournalDispatchContext.Provider>
    </JournalStateContext.Provider>
  );
}

export default App;
