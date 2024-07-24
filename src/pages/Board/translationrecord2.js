import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './translationrecord2.css';

function Translationrecord2() {
    const navigate = useNavigate();
    const [questionHist, setQuestionHist] = useState('');
    const [answerHist, setAnswerHist] = useState('');

    useEffect(() => {
        axios.get('http://ec2-3-34-152-209.ap-northeast-2.compute.amazonaws.com:8080/api/history/1')
            .then(response => {
                const { questionHist, answerHist } = response.data;
                setQuestionHist(questionHist);
                setAnswerHist(answerHist);
            })
            .catch(error => {
                console.error('API 호출 중 오류 발생:', error);
            });
    }, []);

    return (
        <div className='iphone-frame'>
            <div className="title">번역 기록</div>
            <img
                className='backLogo'
                src='../../../img/backLogo.png'
                alt='뒤로가기'
                onClick={() => navigate(-1)}
            />
            <div className='containerTR'>
                <input
                    className='searchTR'
                    value={questionHist} // questionHist 값을 표시
                    readOnly // 수정 불가능하게 설정
                />
                <button className='checkBtnTR'>
                    <img style={{ width: "14px" }} src='../../../img/tri.png' />
                </button>
            </div>
            <p style={{ color: "#fff", padding: "30px" }}>
                ‘{questionHist}’를 검색한 다른 분의 번역 내용이에요.
            </p>
            <div className='question'>
                <p>{questionHist}</p>
            </div>
            <img className='MoziS' src='../../../img/MoziS.png' />
            <div className='answer'>
                <p>{answerHist}</p>
            </div>
        </div>
    );
}

export default Translationrecord2;
