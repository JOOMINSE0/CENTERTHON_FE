import './createboard.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CheckG } from '../../pages/svg/checkG.svg';
import { ReactComponent as CheckP } from '../../pages/svg/checkP.svg';

function Createboard(){
    const navigate = useNavigate();
    return(
    <div className='iphone-frameG'>
        <div className="title">작성하기</div>

        <img
        alt="취소버튼"
        className='topX'
        src='../../../img/X.png'
        onClick={()=>navigate(-1)}
        />

        <div className='locate'>
        <div>

        <div className="flexContainerCB">
            <p className='fontStyleCB'>MZ 언어</p>
            <CheckG style={{marginTop:"5.5%", marginLeft:"10px"}}/>
        </div>

        <input className='searchCB' placeholder='MZ언어를 입력해주세요.'></input>            
        </div>

        <div>
        <div className="flexContainerCB">
        <p className='fontStyleCB'>언어 설명</p>
        <CheckG style={{marginTop:"5.5%", marginLeft:"10px"}}/>
        </div>
        
        <textarea
        className='inputCB'
        placeholder='설명을 작성해주세요.'></textarea>
        </div>

        <div>
        <div className="flexContainerCB">
        <p className='fontStyleCB'>예문</p>
        <CheckG style={{marginTop:"5.5%", marginLeft:"10px"}}/>
        </div>

        <textarea
        className='inputCB'
        placeholder='예문을 작성해주세요.'></textarea>  
        </div>

        </div>
        
        <button className='finishBtn'>완료하기</button>

    </div>
    );
}

export default Createboard;
