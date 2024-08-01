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
            axios.get(`https://port-0-centerthon-be-lz3yvbd8c8a7685f.sel4.cloudtype.app/api/history/${id}`)
                .then(response => {
                    const { questionHist, answerHist } = response.data;
                    setQuestionHist(questionHist);
                    setAnswerHist(answerHist);
                })
                .catch(error => {
                    console.error('API 호출 중 오류 발생:', error);
                });
        } else {
            console.error('ID:', id);
        }
    }, [id]);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className='iphone-frame'>
            <div className="title">번역 기록</div>
            <img
                className='backLogo'
                src='../../../img/backLogo.png'
                alt='뒤로가기'
                onClick={() => navigate('/')}
            />
            <div className='containerTR'>
                <input
                    className='searchTR'
                    value={questionHist}
                    readOnly
                />
                <button className='checkBtnTR'>
                    <img style={{ height: "11px", width: "10px" }} src='../../../img/tri.png' alt='확인' />
                </button>
            </div>

            <p style={{ color: "#fff", paddingLeft: "30px", paddingRight: "30px", fontSize:"14px", marginTop:"-108%", position:"absolute", textAlign:"center"}}>
                ‘{truncateText(questionHist, 7)}’을/를 검색한 다른 분의 번역 내용이에요.
                
            </p>                


            <div className='scroll'>
                <div className='question'>
                    <p>{questionHist}</p>
                </div>
                <img className='MoziS' src='../../../img/MoziS.png' alt='이미지' />
                <div className='answer'>
                    <p>{answerHist}</p>
                </div>
            </div>
        </div>
    );
}

export default Translationrecord2;
