import React from 'react';

const Try = ({tryInfo}) => { //괄호안에 props들어가는 자리인데 구조분해를 한다.
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
};


export default Try;