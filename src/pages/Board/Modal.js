import React from 'react';
import './Modal.css';

function Modal({ closeModal }) {
    return (
        <div className='iphone-frameM'>
            <div className='modal'>
                <p>
                    <img
                        className='X'
                        src='../../../img/X.png'
                        alt='닫기'
                        onClick={closeModal}
                    />
                </p>
                <p>입력하신 MZ언어는 이미 등록되어</p>
                <p>있습니다. 다른 MZ언어를 입력해주세요.</p>
                <button className='checkBtn' onClick={closeModal}>확인</button>
            </div>
        </div>
    );
}

export default Modal;
