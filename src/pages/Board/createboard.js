import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './createboard.css';
import { ReactComponent as CheckG } from '../../pages/svg/checkG.svg';
import { ReactComponent as CheckP } from '../../pages/svg/checkP.svg';
import Modal from './Modal';

function Createboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const existingWords = location.state?.existingWords || [];

    // State 초기화
    const [mzLang, setMzLang] = useState(location.state?.mzLang || '');
    const [langDesc, setLangDesc] = useState(location.state?.langDesc || '');
    const [example, setExample] = useState(location.state?.example || '');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleMzLangChange = (e) => {
        const newValue = e.target.value;
        setMzLang(newValue);

        if (isDisabled) {
            setIsDisabled(false);
        }
    };

    const handleLangDescChange = (e) => setLangDesc(e.target.value);
    const handleExampleChange = (e) => setExample(e.target.value);

    const handleConfirm = () => {
        if (mzLang.trim() === '') {
            return;
        }

        if (existingWords.includes(mzLang.trim())) {
            setIsDisabled(true); 
            setShowModal(true);
        } else {
            setIsConfirmed(true);
            setIsDisabled(false); 
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const renderCheckIcon = (input) => {
        return input ? <CheckP style={{ marginTop: "5.5%", marginLeft: "10px" }} /> : <CheckG style={{ marginTop: "5.5%", marginLeft: "10px" }} />;
    };

    return (
        <div className='iphone-frameG'>
            <div className="title">작성하기</div>

            <img
                alt="취소버튼"
                className='topX'
                src='../../../img/X.png'
                onClick={() => navigate(-1)}
            />

            <div className='locate'>
                <div>
                    <div className="flexContainerCB">
                        <p className='fontStyleCB'>MZ 언어</p>
                        {renderCheckIcon(mzLang)}
                    </div>

                    <input
                        className='searchCB'
                        placeholder='MZ언어를 입력해주세요.'
                        value={mzLang}
                        onChange={handleMzLangChange}
                    />
                    <button
                        className='checkBtnCB'
                        onClick={handleConfirm}
                    >
                        중복 확인
                    </button>
                </div>

                <div>
                    <div className="flexContainerCB">
                        <p className='fontStyleCB'>언어 설명</p>
                        {renderCheckIcon(langDesc)}
                    </div>

                    <textarea
                        className='inputCB'
                        placeholder='설명을 작성해주세요.'
                        value={langDesc}
                        onChange={handleLangDescChange}
                        disabled={!isConfirmed || isDisabled}
                    />
                </div>

                <div>
                    <div className="flexContainerCB">
                        <p className='fontStyleCB'>예문</p>
                        {renderCheckIcon(example)}
                    </div>

                    <textarea
                        className='inputCB'
                        placeholder='예문을 작성해주세요.'
                        value={example}
                        onChange={handleExampleChange}
                        disabled={!isConfirmed || isDisabled}
                    />
                </div>
            </div>

            <button className='finishBtn'>완료하기</button>
            {showModal && <Modal closeModal={closeModal} />}
        </div>
    );
}

export default Createboard;
