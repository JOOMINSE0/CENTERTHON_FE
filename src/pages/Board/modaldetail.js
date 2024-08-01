import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './modaldetail.css';

function Modaldetail({ closeModal, item }) {
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const baseUrl = 'https://port-0-centerthon-be-lz3yvbd8c8a7685f.sel4.cloudtype.app/api/info';
                const endpoint = item.sortOption === 'date' 
                    ? `/sortedByDate/${item.id}` 
                    : `/sortedByView/${item.id}`;
                
                const response = await axios.get(`${baseUrl}${endpoint}`);
                setDetail(response.data);
            } catch (error) {
                console.error('Error fetching detail:', error);
                setError('데이터를 가져오는 중 오류가 발생했습니다.');
            }
        };

        fetchDetail();
    }, [item.id, item.sortOption]);

    const handleModifyClick = () => {
        console.log(item.id);
        navigate('/modifyboard', {
            state: {
                mzLang: item.word,
                langDesc: item.description,
                example: item.exsentence,
                itemId: item.id 
            }
        });
    };

    if (error) {
        return (
            <div className='iphone-frameMD'>
                <div className='modalMD'>
                    <div className='modalLogoContainer'>
                        <img
                            className='XMD'
                            src='../../../img/X.png'
                            alt='닫기'
                            onClick={closeModal}
                        />
                    </div>
                    <div className='error'>{error}</div>
                </div>
            </div>
        );
    }

    if (!detail) {
        return (
            <div className='iphone-frameMD'>
                <div className='modalMD'>
                    <div className='modalLogoContainer'>
                        <img
                            className='XMD'
                            src='../../../img/X.png'
                            alt='닫기'
                            onClick={closeModal}
                        />
                    </div>
                    <div className='loading'>로딩 중...</div>
                </div>
            </div>
        );
    }

    return (
        <div className='iphone-frameMD'>
            <div className='modalMD'>
                <div className='modalLogoContainer'>
                    <img
                        className='modifyMD'
                        src='../../../img/modifyLogo.png'
                        alt='수정'
                        onClick={handleModifyClick}
                    />
                    <img
                        className='XMD'
                        src='../../../img/X.png'
                        alt='닫기'
                        onClick={closeModal}
                    />
                </div>
                <div className="flex-containerMD">
                    <div className='barW'></div>
                    <p style={{ paddingLeft: "10px", fontSize: "22px"}}>{detail.word}</p>
                </div>
                <p className='textLocateMD'>{detail.description}</p>
                <div className='horizantalMD-container'>
                    <div className='horizantalMD'></div>
                </div>
                <p className='textLocateMD'>ex. {detail.exsentence}</p>
            </div>
        </div>
    );
}

export default Modaldetail;
