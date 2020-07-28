import React, { Component } from 'react';
import Try from './Try'

function getNumbers(){ //숫자 4개를 겹치지 않게 랜덤하게 뽑는함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i< 4; i+=1){
        const chosen = candidate.splice(Math.floor(Math.random()* (9- i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component{
    state = {
        result: '',
        value: '',
        answer: getNumbers(), // [1,3,5,7]
        tries: [], // 배열할때 push 쓰면 안된다. 
    };

    onSubmitForm = (e) => { // 내가만든 함수는 화살표 함수를 써야한다. 
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){ 
            this.setState((prevState) => {
                return{
                    result: '홈런!',
                    tries: [...prevState.tries, {try: this.state.value, result: '홈런!'}], // 변수를 만든다음에 기존 배열 복사, 새로운 것을 넣어준다. // 리액트 기준이 바뀐게 있어야 render함수가 실행되기 때문에 
                }
                
            })
            alert('게임을 다시 시작합니다!');
                this.setState({ //초기화
                    value: '',
                    answer: getNumbers(),
                    tries: [], 
                });
        } else { //답을 틀렸으면 
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9){
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ~ ${this.state.answer.join(',')} 였습니다`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({ //초기화
                    value: '',
                    answer: getNumbers(),
                    tries: [], 
                });
            } else {
                for( let i = 0; i< 4; i+=1){
                    if(answerArray[i] === this.state.answer[i]){
                        strike += 1;

                    } else if (this.state.answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return{
                        tries: [...prevState.tries, { try: this.state.value, result: `${strike} 스트리아크 ${ball} 볼입니다`}],
                        value: '',
                    }
                    
                });
            }
        }
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,

        });
    };

    render(){
        return(
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />  {/* value랑 onChange는 세트이다 */}
                    
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => { 
                        return (
                            <Try key = {`${i + 1}차 시도`} tryInfo={v} /> // props: v,i가 인덱스로 들어간다
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball;