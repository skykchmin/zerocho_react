import React, { Component } from 'react';

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

class RSP extends Component {
    state = {
        result: '',
        imgCoord: rspCoords.바위, 
        score: 0,
    };
    
    // 클래스가 client.jsx에서 rendering 되는 순간 -> constructor -> render -> ref설정 -> componentDidMount 
    // -> (setState/props 바뀔때 -> render -> ComponentDidUpdate) 
    // 부모가 나를 없앴을 때 -> componentWillUnMount -> 소멸

    interval; // RSD가 붙었다 땠다 하면

    // componentDidMount 나 componentDidUpdate에서 비동기 요청을 했는데 그게 남아있으면 문제가 되기 때문에 componentWillUnMount를 사용한다

    componentDidMount() { //render가 성공실행되면 실행된다. 하지만, state가 바뀌어서 re-rendering이 일어나면 실행되지 않는다. 컴포넌트가 첫 렌더링 된 후 -> 비동기 요청
        this.interval = setInterval(() => {
            const {imgCoord} = this.state;  
            if(imgCoord === rspCoords.바위){
                this.setState({
                    imgCoord: rspCoords.가위,
                });
            } else if(imgCoord == rspCoords.가위){
                this.setState({
                    imgCoord: rspCoords.보 
                })
            } else if(imgCoord == rspCoords.보){
                this.setState({
                    imgCoord: rspCoords.바위, 
                });
            }  
        }, 1000);
    }

    componentDidUpdate(){ //re-rendering후에는 componentDidUpdate가 실행된다

    }

    componentWillUnMount(){ //컴포넌트가 제거되기 직전 // componentDidMount가 했던것을 제거한다. 부모에 의해서 내가 없어질때  -> 비동기 요청 정리
        clearInterval(this.interval);
    }

    onClickBtn =(choice) => {

    };

    render(){

        const {result, score, imgCoord } = this.state;

        return(
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
                </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;