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
                <div className='bouncing-text' style={{ marginTop: "10px", color: "#311683" }}>
                    <span>M</span>
                    <span>O</span>
                    <span>Z</span>
                    <span>E</span>
                    <span>E</span>
                </div>
                <div className='bouncing-text' style={{ marginTop: "90px", color: "#311683", opacity: 0.5 }}>
                    <span>M</span>
                    <span>O</span>
                    <span>Z</span>
                    <span>E</span>
                    <span>E</span>
                </div>
                <div className='bouncing-text' style={{ marginTop: "180px", color: "#311683" }}>
                    <span>M</span>
                    <span>O</span>
                    <span>Z</span>
                    <span>E</span>
                    <span>E</span>
                </div>
                <div className='main-rotate-circle'></div>
                <p className='main-description'>
                    <p>MZ와의 대화가 어려우셨나요?<br /></p>
                    이해하기 어려웠던 MZ 언어를 검색해보세요.
                </p>

                <button className='main-translate-button' onClick={() => { navigate('/translation') }}>
                    MZ 언어 번역하기
                    <span style={{ marginLeft: "12px", height: "60px" }}> ▶ </span>
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
            </div>
            <div className='main-footer'>
                <p style={{ marginTop: "20px", marginBottom:"10px"}}>서울여자대학교 멋쟁이사자처럼 12TH</p>
                <a href="https://www.instagram.com/likelion_swu/">
                    <img style={{width:"15px", height:"15px"}} src='/img/insta.png' alt='인스타그램' />
                </a>
                <p style={{paddingBottom:"10px", marginTop:"2px"}}>Copyright © 2024 likelion_swu. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Main;
