import './modaldetail.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Modaldetail({ closeModal, item }) {
    const navigate = useNavigate();

    return (
        <div className='iphone-frameMD'>
            <div className='modalMD'>
                <div className='modalLogoContainer'>
                    <img
                        className='modifyMD'
                        src='../../../img/modifyLogo.png'
                        alt='수정'
                        onClick={() => { navigate('/createboard') }}
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
                    <p style={{ paddingLeft: "10px", fontSize: "22px" }}>{item.title}</p>
                </div>
                <p className='textLocateMD'>{item.description}</p>
                <div className='horizantalMD-container'>
                    <div className='horizantalMD'></div>
                </div>
                <p className='textLocateMD'>ex. 요즘 {item.title}이야. 방학이라 그런가 돈을 많이 쓴 듯</p>
            </div>
        </div>
    );
}

export default Modaldetail;
