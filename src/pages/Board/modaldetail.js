import './modaldetail.css';
import React, { useState } from 'react';

function Modaldetail(){

    return(
        <div className='iphone-frameMD'>
            <div className='modalMD'>
                <p>
                    <img
                        className='XMD'
                        src='../../../img/X.png'
                        alt='닫기'
                    />
                </p>
                <div className="flex-containerMD">
                <div className='barW'></div>
                <p style={{paddingLeft:"10px"}}>갑통알</p>                    
                </div>

                <p className='textLocateMD'>갑자기 통장을 보니 알바해야 겠다는 생각이 든다.</p>
                <div className='horizantalMD-container'>
                    <div className='horizantalMD'></div>
                </div>
                
                <p className='textLocateMD'>ex. 요즘 갑통알이야. 방학이라 그런가 돈을 많이 쓴 듯</p>
            </div>
        </div>
    )
}

export default Modaldetail;