import React, { useEffect, useState } from 'react'

const T_session = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:8484/session', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                setUserName(data.userName);
                setEmail(data.email);
                setUserId(data.userId);
            }
        }

        getData();
    }, []);

    
    return (
        <div className='t-session-wrap'>
            <span>이름 : {userName}</span>
            <span>이메일 : {email}</span>
            <span>유저ID : {userId}</span>
        </div>
    )
}

export default T_session