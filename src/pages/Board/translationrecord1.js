import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './translationrecord1.css';
import { useNavigate } from 'react-router-dom';

function Translationrecord1() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const fetchURL = "http://ec2-3-34-152-209.ap-northeast-2.compute.amazonaws.com:8080/";

    useEffect(() => {
        axios.get(fetchURL + 'api/history')
            .then(response => {
                console.log("번역기록 GET")
                console.log(response.data)
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching translation records:', error);
            });
    }, [fetchURL]);

    return (
        <div className='iphone-frame'>
            <div className="title">번역 기록</div>
            <img
                className='backLogo'
                src='../../../img/backLogo.png'
                alt='뒤로가기'
                onClick={() => navigate(-1)}
            />
            <div className="content-wrapper">
                <div className="character-section">
                    <img className='character-image' src='img/sphere.png' alt='모지캐릭터' />
                    <img className='name-image' src='img/mozee_name.png' alt='모지캐릭터' />
                </div>
                <div className='translationRecord-description'>
                    이곳은 제가 번역했던 MZ 언어 및 문장을<br />
                    담은 기록 공간이에요. 모지사전이 번역한<br />
                    다양한 기록을 살펴보세요!
                </div>
            </div>
            <div className="subtitle-wrapper">
                <p className="recommend-subtitle">다른 사용자들의 번역 기록</p>
                <img className="refreshIcon" src='img/refresh.png' alt='새로고침' />
            </div>
            <div className="recommend-container">
                {data.map((item, index) => (
                    <div key={index} className="recommend-flex-container">
                        <div className="bar"></div>
                        <div className="textContainer">
                            <p className="title">{item.questionHist}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button>&lt;</button>
                {[1, 2, 3, 4, 5].map((number, index) => (
                    <div key={index} className={index === 0 ? 'active' : ''}>{number}</div>
                ))}
                <button>&gt;</button>
            </div>
        </div>
    );
}

export default Translationrecord1;