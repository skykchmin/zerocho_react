import React, { Component, useState, useEffect } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => { // 컴퓨터가 어떤 손 내고있는지 판단
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
};


const RSP = () => {
    const [result , setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    useEffect(() => { //useEffect는 useState나 useRef처럼 함수 component 안에다가 적어줘야한다
        interval.current = setInterval(changeHand, 100);

        return () => { //componentWillUnmount 역할 
            clearInterval(interval.current);
        }
    }, [imgCoord]); // 빈 배열에는 꼭 useEffect를 다시 실행할 값만 넣어야한다. 

    const changeHand = () => {     
        if(imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위);
        } else if(imgCoord == rspCoords.가위){
            setImgCoord(rspCoords.보);
        } else if(imgCoord == rspCoords.보){
            setImgCoord(rspCoords.바위);
        } 
    };

    const onClickBtn = (choice) => {
        clearInterval(interval.current); //ref는 current
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore -cpuScore;
        if ( diff === 0){
            setResult('비겼습니다!');

        } else if([-1, 2].includes(diff)){
            setResult('이겼습니다!');
            setScore((prevState) => prevState +1);
        } else {
            setResult('졌습니다!');
            setScore((prevState) => prevState -1);
            
        }
        setTimeout(() =>{
            interval.current = setInterval(changeHand, 100);
        }, 2000);
        
    };

    return(
        <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
        </div>
    <div>{result}</div>
    <div>현재 {score}점</div>
    </>
    );

    
}

export default RSP;