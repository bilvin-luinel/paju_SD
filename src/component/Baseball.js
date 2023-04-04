import React, { useState } from 'react';

function generateRandomNumber() {
    const digits = [];
    while (digits.length < 3) {
        const digit = Math.floor(Math.random() * 10);
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return digits.join('');
}

function getStrikeAndBall(userGuess, secretNumber) {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < 3; i++) {
        if (userGuess[i] === secretNumber[i]) {
            strike++;
        } else if (secretNumber.includes(userGuess[i])) {
            ball++;
        }
    }
    return { strike, ball };
}

function Baseball() {
    const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
    const [userGuess, setUserGuess] = useState('');
    const [result, setResult] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const { strike, ball } = getStrikeAndBall(userGuess, secretNumber);
        if (strike === 3) {
            setResult('정답입니다!');
        } else {
            setResult(`${strike} 스트라이크, ${ball} 볼입니다.`);
        }
        setUserGuess('');
    }

    return (
        <div>
            <h1>숫자 야구 게임</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    숫자 입력:
                    <input
                        type="text"
                        value={userGuess}
                        onChange={(event) => setUserGuess(event.target.value)}
                    />
                </label>
                <button type="submit">제출</button>
            </form>
            <p>{result}</p>
        </div>
    );
}

export default Baseball;