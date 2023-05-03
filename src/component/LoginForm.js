import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../store';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const LoginForm = () => {

    axios.defaults.withCredentials = true;
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(`Username: ${username}, Password: ${password}`);
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post('http://localhost:8484/login', {
                email,
                password,
            }, { withCredentials: true });
            alert('로그인에 성공했습니다.');
            store.dispatch({ type: 'LOGIN' });
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('로그인에 실패했습니다.');
            } else {
                alert('로그인 도중 알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="text"
                    name="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">로그인</button>
        </form>
    );
};

export default LoginForm;