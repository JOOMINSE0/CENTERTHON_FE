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
    const existingWords = location.state?.existingWords || [];
    const [mzLang, setMzLang] = useState(location.state?.mzLang || '');
    const [langDesc, setLangDesc] = useState(location.state?.langDesc?.[0] || '');
    const [example, setExample] = useState(location.state?.example?.join('\n') || '');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(location.state?.isEdit || false);
    const [itemId, setItemId] = useState(location.state?.itemId || null);

    useEffect(() => {
        if (location.state?.mzLang) {
            setIsConfirmed(true);
        }
    }, [location.state]);

    useEffect(() => {
        if (location.state?.isEdit) {
            setIsEdit(true);
            setMzLang(location.state.mzLang);
            setLangDesc(location.state.langDesc?.[0] || '');
            setExample(location.state.example?.join('\n') || '');
        }
    }, [location.state]);

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
            if (isEdit && itemId) {
                await axios.put(`http://ec2-3-34-152-209.ap-northeast-2.compute.amazonaws.com:8080/api/info/${itemId}`, requestData);
                alert('단어가 성공적으로 수정되었습니다.');
            } else {
                await axios.post('http://ec2-3-34-152-209.ap-northeast-2.compute.amazonaws.com:8080/api/info', requestData);
                alert('단어가 성공적으로 등록되었습니다.');
            }
            navigate('/board');
        } catch (error) {
            console.error('단어 등록 중 오류가 발생했습니다.', error);
            alert('단어 등록 중 오류가 발생했습니다.');
        }
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
                        disabled={isEdit} // 수정 모드일 때 비활성화
                    />
                    {!isEdit && (
                        <button
                            className='checkBtnCB'
                            onClick={handleConfirm}
                        >
                            중복 확인
                        </button>
                    )}
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
