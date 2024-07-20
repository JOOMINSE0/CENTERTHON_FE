// RecommendedSearch.js
import React from 'react';
import './recommendedSearch.css';
import { useNavigate } from 'react-router-dom';

function RecommendedSearch() {

    const navigate = useNavigate();
    return (
        <div className='iphone-frame'>
            <div className="title">번역 기록</div>
            <img
                className='backLogo'
                src='../../../img/backLogo.png'
                alt='뒤로가기'
                onClick={() => navigate(-1)}
            />
            <div>
                <p className="recommend-subtitle">다른 사용자들의 번역 기록</p>
                <div className="recommend-container">
                    {['콩콩따', '오늘 완전 쩔죽따지만 난 여전히 뜨아...', '문장 or 키워드', '스불재', '킹정', '억까'].map((text, index) => (
                        <div key={index} className="recommend-flex-container">
                            <div className="bar"></div>
                            <div className="textContainer">
                                {text}
                            </div>
                        </div>
                    ))}
                </div>
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

export default RecommendedSearch;
