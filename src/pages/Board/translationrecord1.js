import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './translationrecord1.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Translationrecord1() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get('page')) || 1;

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [detailedData, setDetailedData] = useState({});
    const fetchURL = "https://port-0-centerthon-be-lz3yvbd8c8a7685f.sel4.cloudtype.app/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(fetchURL + 'api/history');
                const data = response.data;
                setData(data);
                setTotalPages(Math.ceil(data.length / itemsPerPage));

                const details = {};
                const detailPromises = data.map(async (item) => {
                    const detailResponse = await axios.get(fetchURL + `api/history/${item.id}`);
                    details[item.id] = detailResponse.data;
                });

                await Promise.all(detailPromises);
                setDetailedData(details);
            } catch (error) {
                console.error('Error fetching translation records:', error);
            }
        };

        fetchData();
    }, [fetchURL, itemsPerPage]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
            navigate(`/translationrecord_1?page=${newPage}`);
        }
    };

    const handleRefresh = () => {
        window.location.reload(); // 페이지 새로고침
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedData = data.slice(startIndex, startIndex + itemsPerPage);

    const getPageNumbers = () => {
        const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
        return Array.from({ length: Math.min(5, totalPages - startPage + 1) }, (_, index) => startPage + index);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className='iphone-frame'>
            <div className="title">번역 기록</div>
            <img
                className='backLogo'
                src='../../../img/backLogo.png'
                alt='뒤로가기'
                onClick={() => navigate("/")}
            />
            <div className="content-wrapper">
                <div className="character-section">
                    <img className='character-image' src='img/sphere.png' alt='모지캐릭터' />
                    <img className='name-image' src='img/mozee_name.png' alt='모지이름' />
                </div>
                <div className='translationRecord-description'>
                    이곳은 제가 번역했던 MZ 언어 및 문장을<br />
                    담은 기록 공간이에요. 모지사전이 번역한<br />
                    다양한 기록을 살펴보세요!
                </div>
            </div>
            <div className="subtitle-wrapper">
                <p className="recommend-subtitle">다른 사용자들의 번역 기록</p>
                <img className="refreshIcon" src='img/refresh.png' alt='새로고침' onClick={handleRefresh} />
            </div>
            <div className="recommend-container">
                {selectedData.map((item, index) => (
                    <div key={index} className="recommend-flex-container" onClick={() => navigate(`/translationrecord2/${item.id}`, { state: { currentPage } })}>
                        <div className="bar"></div>
                        <div className="textContainer">
                            <p className="title">{truncateText(item.questionHist, 17)} </p>
                            <p className='sub'>{truncateText(detailedData[item.id]?.answerHist || '', 29)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                {getPageNumbers().map(pageNumber => (
                    <div
                        key={pageNumber}
                        className={pageNumber === currentPage ? 'active' : ''}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </div>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
            </div>
        </div>
    );
}

export default Translationrecord1;
