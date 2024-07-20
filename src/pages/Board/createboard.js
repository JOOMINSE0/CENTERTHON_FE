import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as CheckG } from '../../pages/svg/checkG.svg';
import { ReactComponent as CheckP } from '../../pages/svg/checkP.svg';
import Modal from './Modal';
import './createboard.css';

function Createboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const existingWords = location.state?.existingWords || [];

    const [word, setWord] = useState('');
    const [description, setDescription] = useState('');
    const [example, setExample] = useState('');
    const [wordExists, setWordExists] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCheckWord = () => {
        if (existingWords.includes(word)) {
            setWordExists(true);
        } else {
            setWordExists(false);
        }
    };

    const handleFinish = () => {
        if (wordExists === false) {
            navigate('/board');
        } else {
            setShowModal(true);
        }
    };

    return (
        <div className='iphone-frameG'>
            <div className="titleCB">작성하기</div>

            <img
            style={{marginTop:"-192%"}}
                alt="취소버튼"
                className='topX'
                src='../../../img/X.png'
                onClick={() => navigate(-1)}
            />

            <div className='locate'>
                <div>
                    <div className="flexContainerCB">
                        <p className='fontStyleCB'>MZ 언어</p>
                        {wordExists === true && <CheckG style={{marginTop:"5.5%", marginLeft:"10px"}} />}
                        {wordExists === false && <CheckP style={{marginTop:"5.5%", marginLeft:"10px"}} />}
                    </div>

                    <input 
                        className='searchCB' 
                        placeholder='MZ언어를 입력후 확인 버튼을 누르세요.' 
                        value={word} 
                        onChange={(e) => setWord(e.target.value)} 
                    />
                    <button className='checkBtnCB' onClick={handleCheckWord}>확인</button>
                </div>

                <div>
                    <div className="flexContainerCB">
                        <p className='fontStyleCB'>언어 설명</p>
                    </div>
                    
                    <textarea
                        className='inputCB'
                        placeholder='설명을 작성해주세요.'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div>
                    <div className="flexContainerCB">
                        <p className='fontStyleCB'>예문</p>
                    </div>

                    <textarea
                        className='inputCB'
                        placeholder='예문을 작성해주세요.'
                        value={example}
                        onChange={(e) => setExample(e.target.value)}
                    ></textarea>
                </div>
            </div>
            
            <button className='finishBtn' onClick={handleFinish}>완료하기</button>

            {showModal && <Modal closeModal={() => setShowModal(false)} />}
        </div>
    );
}

export default Createboard;
