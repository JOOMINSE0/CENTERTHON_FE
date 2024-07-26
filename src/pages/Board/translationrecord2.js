import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './translationrecord2.css';

function Translationrecord2() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [questionHist, setQuestionHist] = useState('');
    const [answerHist, setAnswerHist] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`https://port-0-centerthon-be-lz124x0vc7996d99.sel4.cloudtype.app/api/history/${id}`)
                .then(response => {
                    const { questionHist, answerHist } = response.data;
                    setQuestionHist(questionHist);
                    setAnswerHist(answerHist);
                })
                .catch(error => {
                    console.error('API 호출 중 오류 발생:', error);
                });
        } else {
            console.error('Invalid ID:', id);
        }
    }, [id]);

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
                    value={questionHist}
                    readOnly
                />
                <button className='checkBtnTR'>
                    <img style={{ height:"11px", width:"10px" }} src='../../../img/tri.png' />
                </button>
            </div>
            <p style={{ color: "#fff", padding: "30px", marginTop:"-30px" }}>
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
