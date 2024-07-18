import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Board from "./pages/Board/board.js";
import Createboard from "./pages/Board/createboard.js";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/board" element={<Board/>} /> {/* MZ 언어 게시판 */}
        <Route path="/createboard" element={<Createboard/>} /> {/* MZ 언어 작성 */}
         {/* <Route path="/modal" element={<Modal/>} /> 모달창 */}
        {/* <Route path="/recommend2" element={<Recommend2/>} /> 추천2 */}

      </Routes>
    </Router>
  );
}

export default App;
