import React, { useState } from 'react';
import './board.css';
import Modal from './Modal.js';

function Board() {
    const [showModal, setShowModal] = useState(false);

    const handleFlexContainerClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className='iphone-frame'>
            <div className="title">MZ 언어 게시판</div>
            <input className='search' placeholder='검색어를 입력하세요' />
            <img
                className='searchLogo'
                src='../../../img/searchLogo.png'
                alt='검색'
            />

            <div className='container1' style={{ color: "#fff" }}>
                <p>조회순</p>
                <p>ㅣ</p>
                <p style={{ color: '#CECECE' }}>최신순</p>
            </div>

            <button className='writeBtn'>
                <img
                    className='penLogo'
                    src='../../../img/penLogo.png'
                    alt='작성하기'
                />
            </button>

            <div className="container">
                <div onClick={handleFlexContainerClick} className="flex-container">
                    <div className="bar"></div>
                    <div className="textContainer">
                        <p>완내스</p>
                        <p>완전 내 스타일</p>
                    </div>
                </div>

                <div onClick={handleFlexContainerClick} className="flex-container">
                    <div className="bar"></div>
                    <div className="textContainer">
                        <p>오저치고</p>
                        <p>완전 내 스타일</p>
                    </div>
                </div>
            </div>

            {showModal && <Modal closeModal={closeModal} />}
        </div>
    );
}

export default Board;
