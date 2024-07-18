import './createboard.css';

function Createboard(){
    return(
    <div className='iphone-frameG'>
        <div className="title">작성하기</div>
        <div className='locate'>
        <div>
        <p className='fontStyleCB'>MZ 언어</p>
        <input className='searchCB' placeholder='MZ언어를 입력해주세요.'></input>            
        </div>

        <div>
        <p className='fontStyleCB'>언어 설명</p>
        <textarea
        className='inputCB'
        placeholder='설명을 작성해주세요.'></textarea>
        </div>

        <div>
        <p className='fontStyleCB'>예문</p>
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
