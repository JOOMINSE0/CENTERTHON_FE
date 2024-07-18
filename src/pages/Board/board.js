import './board.css';

function Board(){
    return(
        <div className='iphone-frame'>
           <div class="title">MZ 언어 게시판</div>
           <input className='search' placeholder='검색어를 입력하세요'/>
            <img
            className='searchLogo'
            src='../../../img/searchLogo.png'
            alt='검색'
            />   
            


           <div className='container1' style={{color:"#fff"}}>
            <p>조회순</p>
            <p>ㅣ</p>
            <p color='#CECECE'>최신순</p>
           </div>





            <button className='writeBtn'>
            <img
            className='penLogo'
            src='../../../img/penLogo.png'
            alt='작성하기'
            />
            </button>


           <div class="container">
            
            <div class="flex-container">
                <div class="bar"></div>
                <div class="textContainer">
                    <p>완내스</p>
                    <p>완전 내 스타일</p> 
                </div>
            </div>
            
            <div class="flex-container">
                <div class="bar"></div>
                <div class="textContainer">
                    <p>오저치고</p>
                    <p>완전 내 스타일</p> 
                </div>
            </div>


        </div>
    </div>
    );
}

export default Board;