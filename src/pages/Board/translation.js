import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './translation.css';

function Translation() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [translatedText, setTranslatedText] = useState({ text: '', isSpecial: false });
    const [recommendedKeywords, setRecommendedKeywords] = useState([]);
    const [stream, setStream] = useState(null);
    const [media, setMedia] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [source, setSource] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [recordedFileName, setRecordedFileName] = useState('');
    const fetchURL = "https://port-0-centerthon-be-lz3yvbd8c8a7685f.sel4.cloudtype.app/";

    useEffect(() => {
        axios.get(fetchURL + 'api/recommend')
            .then(response => {
                const filteredKeywords = response.data;
                setRecommendedKeywords(filteredKeywords);
            })
            .catch(error => {
                console.error('Error fetching recommended keywords:', error.response || error.message);
            });
    }, [fetchURL]);

    const onRecAudio = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createScriptProcessor(0, 1, 1);
        setAnalyser(analyser);

        function makeSound(stream) {
            const source = audioContext.createMediaStreamSource(stream);
            setSource(source);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
        }

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            setStream(stream);
            setMedia(mediaRecorder);
            makeSound(stream);
            setIsRecording(true);

            mediaRecorder.ondataavailable = function (e) {
                const audioBlob = new Blob([e.data], { type: 'audio/mp3' });
                setAudioUrl(audioBlob);
                const fileName = 'recording.mp3';
                setRecordedFileName(fileName);
                setInputValue(fileName);
                console.log('Recorded file:', fileName);
            };

            analyser.onaudioprocess = function (e) {
                if (e.playbackTime > 60) {
                    stream.getAudioTracks().forEach((track) => track.stop());
                    mediaRecorder.stop();
                    analyser.disconnect();
                    audioContext.createMediaStreamSource(stream).disconnect();
                    setIsRecording(false);
                }
            };
        }).catch((error) => {
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                alert('마이크 권한을 허용해주세요.');
            }
        });
    };

    const offRecAudio = () => {
        media.ondataavailable = function (e) {
            const audioBlob = new Blob([e.data], { type: 'audio/mp3' });
            setAudioUrl(audioBlob);
            const fileName = 'recording.mp3';
            setRecordedFileName(fileName);
            setInputValue(fileName);
            console.log('Recorded file:', fileName);
        };

        stream.getAudioTracks().forEach((track) => track.stop());
        media.stop();
        analyser.disconnect();
        source.disconnect();
        setIsRecording(false);
    };

    const handleMicClick = () => {
        if (isRecording) {
            offRecAudio();
        } else {
            onRecAudio();
        }
    };

    const handleTranslate = () => {
        if (!inputValue) {
            alert('문장을 입력하세요.');
            return;
        }

        setTranslatedText({ text: "모지가 열심히 번역 중이에요...", isSpecial: true });

        if (audioUrl && inputValue === recordedFileName) {
            console.log('Recorded file:', inputValue);

            const formData = new FormData();
            formData.append('file', audioUrl, 'recording.mp3');

            axios.post(fetchURL + 'api/translate/stt', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log("파일 번역 성공");
                    setTranslatedText({ text: response.data, isSpecial: false });
                })
                .catch(error => {
                    console.error('Error uploading file:', error.response || error.message);
                    setTranslatedText({ text: "Error translating audio.", isSpecial: true });
                });
        } else {
            console.log('Text input:', inputValue);
            const encodedInputValue = encodeURIComponent(inputValue);
            const url = `${fetchURL}api/translate?question=${encodedInputValue}`;
            axios.post(url)
                .then(response => {
                    console.log("텍스트 번역 성공");
                    setTranslatedText({ text: response.data, isSpecial: false });
                })
                .catch(error => {
                    console.error('Error translating text:', error.response || error.message);
                    setTranslatedText({ text: "Error translating text.", isSpecial: true });
                });
        }

        setInputValue('');
        setAudioUrl(null);
    };

    const handleKeywordClick = (keyword) => {
        setInputValue(keyword);
    };

    return (
        <div className='iphone-frameG'>
            <img className='cancle-button' src='/img/X.png' alt='취소버튼' onClick={() => { navigate('/') }} />
            <div className='mozee-container'>
                <div className='trans-rotate-circle'></div>
                <img className='mozee-text' src='/img/MoZee_text.png' alt='모지 텍스트' onClick={handleMicClick} />
            </div>
            <p className='trans-description'>번역이 필요한 MZ 언어 · 문장을 입력하세요.</p>
            <div className='trans-search-container'>
                <input
                    className='trans-search'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    maxLength={40}
                />

                <div className='mic-icon-container'>
                    <img className='mic-icon' src='/img/mic-button.png' alt='마이크 아이콘' onClick={handleMicClick} />
                </div>
                <button
                    className='trans-search-button'
                    onClick={handleTranslate}
                    disabled={!inputValue}
                >
                    <img src='/img/next.png' alt='다음' />

                </button>
            </div>

            <textarea
                className={`trans-input ${translatedText.isSpecial ? 'special-text' : ''}`}
                value={translatedText.text}
                readOnly
            />
            <div className='recommend-translation-title'>추천 검색어</div>
            <div className='recommend-translation-container'>
                {recommendedKeywords.map((keyword, index) => (
                    <div key={index} onClick={() => handleKeywordClick(keyword)}>{keyword}</div>
                ))}
            </div>
        </div>
    );
}

export default Translation;
