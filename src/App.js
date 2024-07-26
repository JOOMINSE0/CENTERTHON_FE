import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Board from "./pages/Board/board.js";
import Createboard from "./pages/Board/createboard.js";
import Modal from "./pages/Board/Modal.js";
import Modaldetail from "./pages/Board/modaldetail.js";
import './App.css';
import Translation from "./pages/Board/translation.js";
import Translationrecord1 from "./pages/Board/translationrecord1.js";
import Main from "./pages/Board/main.js";
import Translationrecord2 from "./pages/Board/translationrecord2.js";
import Modifyboard from "./pages/Board/modifyboard.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 */}
        <Route path="/translation" element={<Translation />} /> {/* 번역 기능 */}
        <Route path="/translationrecord_1" element={<Translationrecord1 />} /> {/* 번역 기록 1 */}
        <Route path="/board" element={<Board />} /> {/* MZ 언어 게시판 */}
        <Route path="/createboard" element={<Createboard />} /> {/* MZ 언어 작성 */}
        <Route path="/modifyboard" element={<Modifyboard />} /> {/* MZ 수정 작성 */}
        <Route path="/modal" element={<Modal />} /> {/* 작성하기 모달창 */}
        <Route path="/modaldetail" element={<Modaldetail />} /> {/* 언어 게시판 상세페이지 모달창 */}
        <Route path="/translationrecord2/:id" element={<Translationrecord2 />} />{/* 번역 기록 2 */}
      </Routes>
    </Router>
  );
}

export default App;
