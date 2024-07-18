import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Board from "./pages/Board/board.js";
import Createboard from "./pages/Board/createboard.js";
import Modal from "./pages/Board/Modal.js";
import Modaldetail from "./pages/Board/modaldetail.js";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/board" element={<Board/>} /> {/* MZ 언어 게시판 */}
        <Route path="/createboard" element={<Createboard/>} /> {/* MZ 언어 작성 */}
        <Route path="/modal" element={<Modal/>} /> {/* 작성하기 모달창 */}
        <Route path="/modaldetail" element={<Modaldetail/>} /> {/* 언어 게시판 모달창 */}
      </Routes>
    </Router>
  );
}

export default App;
