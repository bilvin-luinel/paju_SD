import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
    const [formData, setFormData] = useState({
        userName: '',
        nickName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8484/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.status === 201) {
                alert("회원가입에 성공했습니다!");
                navigate('/login');
            } else if (response.status === 409) {
                alert("이미 존재하는 이메일입니다.");
            }
        } catch (error) {
            console.error(error);
            alert("회원가입 도중 알 수 없는 오류가 발생했습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userName">Name:</label>
                <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="nickName">NickName:</label>
                <input type="text" id="nickName" name="nickName" value={formData.nickName} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="passwordConfirm">Confirm Password:</label>
                <input type="password" id="passwordConfirm" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;