import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './createboard.css';
import { ReactComponent as CheckG } from '../../pages/svg/checkG.svg';
import { ReactComponent as CheckP } from '../../pages/svg/checkP.svg';
import Modal from './Modal';

function Createboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mzLang, setMzLang] = useState('');
    const [langDesc, setLangDesc] = useState('');
    const [example, setExample] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [existingWords, setExistingWords] = useState([]);

    useEffect(() => {
        if (location.state && location.state.existingWords) {
            setExistingWords(location.state.existingWords);
        }
    }, [location.state]);

    const handleMzLangChange = (e) => {
        const newValue = e.target.value;

        if (newValue.length > 18) {
            alert('MZ언어는 18자까지만 입력할 수 있습니다.');
            return;
        }

        setMzLang(newValue);

        if (isDisabled) {
            setIsDisabled(false);
        }
    };

    const handleLangDescChange = (e) => {
        const newValue = e.target.value;

        if (newValue.length > 40) {
            alert('언어 설명은 40자까지만 입력할 수 있습니다.');
            return;
        }

        setLangDesc(newValue);
    };

    const handleExampleChange = (e) => {
        const newValue = e.target.value;

        if (newValue.length > 40) {
            alert('예문은 40자까지만 입력할 수 있습니다.');
            return;
        }

        setExample(newValue);
    };

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

    const handleSubmit = async () => {
        if (!isConfirmed || isDisabled) {
            return;
        }

        const requestData = {
            word: mzLang.trim(),
            description: [langDesc.trim()],
            exsentence: example.split('\n').map(line => line.trim())
        };

        try {
            await axios.post('https://port-0-centerthon-be-lz3yvbd8c8a7685f.sel4.cloudtype.app/api/info', requestData);
            alert('단어가 성공적으로 등록되었습니다.');
            navigate('/board');
        } catch (error) {
            console.error('단어 등록 중 오류가 발생했습니다.', error);
            alert('단어 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className='iphone-frameG'>
            <div className="titleCB">작성하기</div>

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
                        <p className='fontStyleMB'>예문</p>
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

            <button
                className='finishBtn'
                onClick={handleSubmit}
                disabled={!isConfirmed || isDisabled}
            >
                완료하기
            </button>
            {showModal && <Modal closeModal={closeModal} />}
        </div>
    );
}

export default Createboard;
