import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './modifyboard.css';
import { ReactComponent as CheckG } from '../../pages/svg/checkG.svg';
import { ReactComponent as CheckP } from '../../pages/svg/checkP.svg';

function Modifyboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mzLang, setMzLang] = useState(location.state?.mzLang || '');
    const [langDesc, setLangDesc] = useState(location.state?.langDesc?.[0] || '');
    const [example, setExample] = useState(location.state?.example?.join('\n') || '');
    const [itemId, setItemId] = useState(location.state?.itemId || null);

    useEffect(() => {
        console.log(itemId);
        console.log(location.state);

    }, [location.state]);

    const handleLangDescChange = (e) => setLangDesc(e.target.value);
    const handleExampleChange = (e) => setExample(e.target.value);

    const renderCheckIcon = (input) => {
        return input ? <CheckP style={{ marginTop: "5.5%", marginLeft: "10px" }} /> : <CheckG style={{ marginTop: "5.5%", marginLeft: "10px" }} />;
    };

    const handleSubmit = async () => {
        const requestData = {
            word: mzLang.trim(),
            description: [langDesc.trim()],
            exsentence: example.split('\n').map(line => line.trim())
        };

        try {
            if (itemId) {
                await axios.put(`https://port-0-centerthon-be-lz124x0vc7996d99.sel4.cloudtype.app/api/info/${itemId}`, requestData);
                alert('단어가 성공적으로 수정되었습니다.');
                navigate('/board');
            } else {
                console.error('수정할 단어의 ID가 없습니다.');
                alert('수정할 단어의 ID가 없습니다.');
            }
        } catch (error) {
            console.error('단어 수정 중 오류 발생:', error);
            alert('단어 수정 중 오류가 발생했습니다. 관리자에게 문의하세요.');
        }
    };

    return (
        <div className='iphone-frameG'>
            <div className="titleMB">수정하기</div>
            <img
                alt="취소버튼"
                className='topX'
                src='../../../img/X.png'
                onClick={() => navigate(-1)}
            />
            <div className='locate'>
                <div>
                    <div className="flexContainerMB">
                        <p className='fontStyleMB'>MZ 언어</p>
                        {renderCheckIcon(mzLang)}
                    </div>
                    <input
                        className='searchMB'
                        placeholder='MZ언어를 입력해주세요.'
                        value={mzLang}
                        disabled
                    />
                </div>
                <div>
                    <div className="flexContainerMB">
                        <p className='fontStyleCB'>언어 설명</p>
                        {renderCheckIcon(langDesc)}
                    </div>
                    <textarea
                        className='inputMB'
                        placeholder='설명을 작성해주세요.'
                        value={langDesc}
                        onChange={handleLangDescChange}
                    />
                </div>
                <div>
                    <div className="flexContainerMB">
                        <p className='fontStyleCB'>예문</p>
                        {renderCheckIcon(example)}
                    </div>
                    <textarea
                        className='inputMB'
                        placeholder='예문을 작성해주세요.'
                        value={example}
                        onChange={handleExampleChange}
                    />
                </div>
            </div>
            <button
                className='finishBtn'
                onClick={handleSubmit}
            >
                완료하기
            </button>
        </div>
    );
}

export default Modifyboard;
