import React from 'react';
import './main.css';
import { useNavigate } from 'react-router-dom';

function Main() {

    const navigate = useNavigate();
    return (
        <div className='frameMain'>
            <img className='logo' src='/img/logo.png' alt='로고' />

            <div className='main-content'>
                <p className='main-title'>모지사전</p>
                <p className='main-subtitle'>MZ’S LANGUAGE DICTIONARY</p>
                <div className='bouncing-text'>
                    <span>M</span>
                    <span>O</span>
                    <span>Z</span>
                    <span>E</span>
                    <span>E</span>
                </div>
                <div className='bouncing-text' style={{ marginTop: "90px" }}>
                    <span>M</span>
                    <span>O</span>
                    <span>Z</span>
                    <span>E</span>
                    <span>E</span>
                </div>
                <div className='bouncing-text' style={{ marginTop: "180px" }}>
                    <span>M</span>
                    <span>O</span>
                    <span>Z</span>
                    <span>E</span>
                    <span>E</span>
                </div>
                <div className='main-rotate-circle'></div>
                <p className='main-description'>
                    MZ와의 대화가 어려우셨나요?<br />
                    이해하기 어려웠던 MZ 언어를 검색해보세요.
                </p>
                <button className='main-translate-button' onClick={() => { navigate('/translationrecord_1') }}>
                    MZ 언어 번역하기
                    <span style={{ marginLeft: "12px" }}>►</span>
                </button>
                <div className='main-footer-buttons'>
                    <div className='main-footer-button' onClick={() => { navigate('/board') }}>
                        <img src='/img/sphere1.png' alt='MZ 언어 게시판' />
                        <span>MZ 언어 게시판</span>
                    </div>
                    <div className='main-footer-button' onClick={() => { navigate('/translationrecord_1') }}>
                        <img src='/img/sphere2.png' alt='추천 검색' />
                        <span>번역 기록</span>
                    </div>
                </div>
            </div></div>
    );
}

export default Main;
