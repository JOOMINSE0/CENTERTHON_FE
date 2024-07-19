import './recommendedSearch.css';


function RecommendedSearch() {
    return (
        <div className='iphone-frame'>
            <div>
                <img className='back-button' src='/img/back.png' alt='이전' />
                <div className="title">추천 검색</div>
            </div>
            <div>
                <p>추천 검색어</p>
                <div></div>
            </div>
            <div>
                <p>많이 검색된 MZ 언어</p>
                <div className="container">
                    <div className="flex-container">
                        <div className="bar"></div>
                        <div className="textContainer">
                            <p>완내스</p>
                            <p>완전 내 스타일</p>
                        </div>
                    </div>

                    <div className="flex-container">
                        <div className="bar"></div>
                        <div className="textContainer">
                            <p>오저치고</p>
                            <p>완전 내 스타일</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                12345
            </div>


        </div>
    )
}

export default RecommendedSearch;