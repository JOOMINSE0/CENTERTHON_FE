import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './board.css';
import Modaldetail from './modaldetail.js';

function Board() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleFlexContainerClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setFilteredData([]);  // 검색어 변경 시 필터링된 데이터 초기화
    };

    const handleSearchClick = () => {
        const filtered = data.filter(item => item.title.includes(searchQuery));
        setFilteredData(filtered);
    };

    const data = [
        { title: "완내스", description: "완전 내 스타일" },
        { title: "오저치고", description: "오늘 저녁 치킨 고?" },
        { title: "별다줄", description: "별 걸 다 줄인다" },
        { title: "억텐", description: "억지로 기분 좋은 척함" }
    ];

    const displayedData = filteredData.length > 0 ? filteredData : data;
    const existingWords = data.map(item => item.title);  // 기존 단어 목록

    return (
        <div className='iphone-frame'>
            <div className="title">MZ 언어 게시판</div>
            <img
                className='backLogo'
                src='../../../img/backLogo.png'
                alt='뒤로가기'
                onClick={() => navigate(-1)}
            />
            <input
                className='search'
                placeholder='검색어를 입력하세요'
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <img
                className='searchLogo'
                src='../../../img/searchLogo.png'
                alt='검색'
                onClick={handleSearchClick}
            />
            <div className='container1' style={{ color: "#fff" }}>
                <p style={{ cursor: "pointer" }}>조회순</p>
                <p>ㅣ</p>
                <p style={{ color: '#CECECE', cursor: "pointer" }}>최신순</p>
            </div>

            <div className='scroll'>
                <div className="container">
                    {displayedData.map((item, index) => (
                        <div
                            key={index} onClick={() => handleFlexContainerClick(item)} className="flex-container">
                            <div className="bar"></div>
                            <div className="textContainer">
                                <p>{item.title}</p>
                                <p style={{ fontSize: "11px", marginTop: "-5px" }}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => { navigate('/createboard', { state: { existingWords } }) }}
                className='writeBtn'>
                <img
                    className='penLogo'
                    src='../../../img/penLogo.png'
                    alt='작성하기'
                />
            </button>
            {showModal && <Modaldetail closeModal={closeModal} item={selectedItem} />}
        </div>
    );
}

export default Board;
