import './modaldetail.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Modaldetail({ closeModal, item }) {
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://ec2-3-34-152-209.ap-northeast-2.compute.amazonaws.com:8080/api/info/${item.id}`);
                setDetail(response.data);
            } catch (error) {
                console.error('상세 정보를 가져오는 중 오류가 발생했습니다.', error);
                setError('해당 ID의 정보가 없습니다.');
            }
        };

        fetchDetail();
    }, [item.id]);

    const handleModifyClick = () => {
        navigate('/createboard', {
            state: {
                mzLang: detail.word,
                langDesc: detail.description,
                example: detail.exsentence,
                isEdit: true,
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
                    <p style={{ paddingLeft: "10px", fontSize: "22px" }}>{detail.word}</p>
                </div>
                <p className='textLocateMD'>{detail.description}</p>
                <div className='horizantalMD-container'>
                    <div className='horizantalMD'></div>
                </div>
                <p className='textLocateMD'>{detail.exsentence}</p>
            </div>
        </div>
    );
}

export default Modaldetail;
