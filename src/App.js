import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Journal from "./Pages/Journal";
import Edit from "./Pages/Edit";
import New from "./Pages/New";
import Button from "./Components/Button";
import Header from "./Components/Header";
import RouteLinkTest from "./Components/RouteLinkTest";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header
          text="header"
          leftChild={
            <Button text="left" type="positive" onClick={() => alert("left")} />
          }
          rightChild={<Button text="right" onClick={() => alert("right")} />}
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
  );
}

export default App;
