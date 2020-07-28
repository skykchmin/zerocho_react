import React, { Component } from 'react';
import Try from './Try'

function getNumbers(){ //숫자 4개를 겹치지 않게 랜덤하게 뽑는함수

}

class NumberBaseball extends Component{
    state = {
        result: '',
        value: '',
        answer: getNumbers(), 
        tries: [],
    };

    onSubmitForm = () => { // 내가만든 함수는 화살표 함수를 써야한다. 

    };

    onChangeInput = () => {

    };

    fruits = [ // 가독성을 위해 배열을 따로 뺸다. 
        { fruit: '사과', taste: '맛있다'},
        { fruit: '감', taste: '시다'},
        { fruit: '귤', taste: '달다'},
        { fruit: '배', taste: '맛있다'},
        { fruit: '무', taste: '맛있다'},
    ]; 

    render(){
        return(
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />  {/* value랑 onChange는 세트이다 */}
                    
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.fruits.map((v, i) => { 
                        return (
                            <Try key = {v.fruit + v.taste} value={v} index={i} /> // props: v,i가 인덱스로 들어간다
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball;