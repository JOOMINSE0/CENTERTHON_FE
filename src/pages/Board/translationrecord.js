import './translationrecord.css';
import { useNavigate } from 'react-router-dom';

function Translationrecord(){
    const navigate = useNavigate();
    return(
        <div className='iphone-frame'>
            <div className="title">번역 기록</div>
            <div className='containerTR'>
            <img
                className='backLogo'
                src='../../../img/backLogo.png'
                alt='뒤로가기'
                onClick={() => navigate(-1)}
            />
            <input className='searchTR'>

            </input>
                    
            <button className='checkBtnTR'>
                <img style={{width:"14px"}} src='../../../img/tri.png'/>

            </button>

            </div>

            <p style={{color:"#fff", position:"relative"}} >‘스불재’를 검색한 다른 분의 번역 내용이에요.</p>

            <div className='word'></div>

            <div className='answer'></div>


                



        </div>
    )
}

export default Translationrecord;