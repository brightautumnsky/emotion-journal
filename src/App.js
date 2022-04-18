import React, { useEffect, useReducer, useRef } from "react";
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
      const newJournal = { ...action.data };
      newState = [...state, newJournal];
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
  localStorage.setItem("journals", JSON.stringify(newState));
  return newState;
};

export const JournalStateContext = React.createContext();
export const JournalDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    const localJournalsData = JSON.parse(localStorage.getItem("journals"));

    if (localJournalsData) {
      const sortedJournalsData = localJournalsData.sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      // 정렬 후 가장 큰 id 값의 + 1
      if (sortedJournalsData.length >= 1) {
        dataId.current = parseInt(sortedJournalsData[0].id) + 1;
      }

      dispatch({ type: "INIT", data: sortedJournalsData });
    }
  }, []);

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
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </JournalDispatchContext.Provider>
    </JournalStateContext.Provider>
  );
}

export default App;
