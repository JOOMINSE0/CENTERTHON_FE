import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './board.css';
import Modaldetail from './modaldetail.js';

function Board() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({ id: 0 });
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('date'); // 기본 정렬 기준을 'date'로 설정

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
            setError('데이터를 가져오는 중 오류가 발생했습니다.');
        }
    };

    const fetchDataBySearch = async (keyword = '') => {
        const url = `http://ec2-3-34-152-209.ap-northeast-2.compute.amazonaws.com:8080/api/info/search?keyword=${keyword}`;
        fetchData(url);
    };

    const fetchSortedByDate = async () => {
        const url = 'http://ec2-3-34-152-209.ap-northeast-2.compute.amazonaws.com:8080/api/info/sortedByDate';
        fetchData(url);
    };

    const fetchSortedByView = async () => {
        const url = 'http://ec2-3-34-152-209.ap-northeast-2.compute.amazonaws.com:8080/api/info/sortedByView';
        fetchData(url);
    };

    useEffect(() => {
        if (sortOption === 'date') {
            fetchSortedByDate();
        } else if (sortOption === 'view') {
            fetchSortedByView();
        }
    }, [sortOption]);

    useEffect(() => {
        if (searchQuery === '') {
            fetchSortedByDate();
        }
    }, [searchQuery]);

    const handleFlexContainerClick = (item, index) => {
        setSelectedItem({ ...item, id: index + 4 });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem({ id: 0 });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        fetchDataBySearch(searchQuery);
    };

    const handleSortByDate = () => {
        setSortOption('date');
    };

    const handleSortByView = () => {
        setSortOption('view');
    };

    const existingWords = data.map(item => item.word);

    return (
        <div className='iphone-frame'>
            <div className="title">MZ 언어 게시판</div>
            <img
                className='backLogo'
                src='../../../img/backLogo.png'
                alt='뒤로가기'
                onClick={() => navigate(-1)}
            />
            <input 
                className='search' 
                placeholder='검색어를 입력하세요' 
                value={searchQuery} 
                onChange={handleSearchChange} 
            />
            <img
                className='searchLogo'
                src='../../../img/searchLogo.png'
                alt='검색'
                onClick={handleSearchClick}
            />
            <div className='container1' style={{ color: "#fff" }}>
                <p 
                    className={`sort-option ${sortOption === 'view' ? 'active' : ''}`} 
                    onClick={handleSortByView}
                >
                    조회순
                </p>
                <p>ㅣ</p>
                <p 
                    className={`sort-option ${sortOption === 'date' ? 'active' : ''}`} 
                    onClick={handleSortByDate}
                >
                    최신순
                </p>
            </div>

            <div className='scroll'>
                {error && <div className="error">{error}</div>}
                <div className="container">
                    {data.map((item, index) => (
                        <div
                        key={index} 
                        onClick={() => handleFlexContainerClick(item, index)} 
                        className="flex-container"
                        >
                            <div className="bar"></div>
                            <div className="textContainer">
                                <p>{item.word}</p>
                                <p style={{ fontSize: "11px", marginTop: "-5px" }}>{item.description[0]}</p>
                            </div>
                        </div>
                    ))}
                </div>  
            </div>
            
            <button
                onClick={() => { navigate('/createboard', { state: { existingWords } }) }}
                className='writeBtn'
            >
                <img
                    className='penLogo'
                    src='../../../img/penLogo.png'
                    alt='작성하기'
                />
            </button>
            {showModal && <Modaldetail closeModal={closeModal} item={selectedItem} />}
        </div>
    );
}

export default Board;
