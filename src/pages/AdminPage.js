import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AdminPage = () => {


    //로그인 및 비밀번호 변경 관련 useState
    const [wrongEmail, setWrongEmail] = useState(false);
    const [wrong2ndPassword, setWrong2ndPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sndPassword, setSndPassword] = useState('');
    const [isLogin, setIsLogin] = useState('');
    const [temp, setTemp] = useState('');
    const [changePW, setChangePW] = useState('');
    const [confirmChangePW, setConfirmChangePW] = useState('');
    const [wrongConfirmPW, setWrongConfirmPW] = useState(false);

    //운영자 설정 관련 useState
    const [managers, setManagers] = useState([]);
    const [newManagerEmail, setNewManagerEmail] = useState('');
    const [thereIsNoManager, setThereIsNoManager] = useState(false);


    //useEffect
    useEffect(() => {
        fetchManagers();
    }, []);

    //리액트 Hook
    const navigate = useNavigate();



    //로그인 및 비밀번호 변경 관련 함수
    const goToHome = () => {
        // navigate('/');
        console.log('토큰은 ', localStorage.getItem('token'))
    }
    const hidePassword = () => {
        if (showPassword == true) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    }
    const hidePassword2 = () => {
        if (showPassword2 == true) {
            setShowPassword2(false);
        } else {
            setShowPassword2(true);
        }
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://182.209.228.24:8484/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.status === 200) {
                const { token } = await response.json();
                localStorage.setItem('token', token);

                // const decodedToken = jwt_decode(token);
                // const tkEmail = decodedToken.email;
                // const tkPassword = decodedToken.password;
                // const tkSndPassword = decodedToken.sndPassword;

                // console.log('토큰 이메일 ', tkEmail, tkPassword, tkSndPassword)

                setIsLogin('afterLogin');
                setEmail('');
                setPassword('');
                setWrongEmail(false);
                setShowPassword(false);
            } else if (response.status === 401 || response.status === 403) {
                setWrongEmail(true);
            } else {
                alert('로그인 도중 알 수 없는 오류가 발생했습니다.');
            }
        } catch (err) {
            console.log('로그인 도중 오류 발생 : ', err);
        }
    }
    const handleLogout = () => {
        setIsLogin('');
        setTemp('');
        setEmail('');
        setPassword('');
        setSndPassword('');
        setWrong2ndPassword(false);
        setWrongEmail(false);
        setShowPassword(false);
        setShowPassword2(false);
        setChangePW('');
        setConfirmChangePW('');
        setWrongConfirmPW(false);

        setNewManagerEmail('');
        setThereIsNoManager(false);

        localStorage.removeItem('token');
    }
    const handleCancle = () => {
        setIsLogin('afterLogin');
        setTemp('');
        setEmail('');
        setPassword('');
        setSndPassword('');
        setWrong2ndPassword(false);
        setWrongEmail(false);
        setShowPassword(false);
        setShowPassword2(false);
        setChangePW('');
        setConfirmChangePW('');
        setWrongConfirmPW(false);

        setNewManagerEmail('');
        setThereIsNoManager(false);
    }
    const goToSetManager = () => {
        setTemp('setManager')
        setIsLogin('2ndpw')
    }
    const goToSetEmail = () => {
        setTemp('setEmail')
        setIsLogin('2ndpw')
    }
    const goToChangePassword = () => {
        setTemp('changePassword')
        setIsLogin('2ndpw')
    }
    const goToChange2ndPassword = () => {
        setTemp('change2ndPassword')
        setIsLogin('2ndpw')
    }
    const handleChange2ndPassword = (e) => {
        setSndPassword(e.target.value)
    }
    const handle2ndLogin = async (e) => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = jwt_decode(token);

                const tk2ndPassword = decodedToken.sndPassword;

                if (sndPassword == tk2ndPassword) {
                    setWrong2ndPassword(false);
                    setIsLogin(temp);
                    setShowPassword(false);
                    //로그인 성공
                } else {
                    setWrong2ndPassword(true);
                }

            } catch (err) {
                console.log('토큰 디코딩 오류 : ', err);
            }
        } else {
            console.log('토큰이 없습니다.');
        }
    }

    const changePassword = (e) => {
        setChangePW(e.target.value);
    }
    const changePasswordConfirm = (e) => {
        setConfirmChangePW(e.target.value);
    }
    const changePasswordFunction = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const tkEmail = decodedToken.email;

        if (changePW != confirmChangePW) {
            setWrongConfirmPW(true);
        } else if (token) {
            try {
                const response = await fetch('http://182.209.228.24:8484/admin-change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tkEmail,
                        changePW,
                    }),
                })
                if (response.status === 200) {
                    setWrongConfirmPW(false);
                    alert('비밀번호를 변경했습니다.');
                    setIsLogin('afterLogin')
                    setShowPassword(false);
                    setShowPassword2(false);
                    setChangePW('');
                    setConfirmChangePW('');
                }
            } catch (err) {
                console.log('비밀번호 변경 도중 에러 발생 : ', err)
            }
        } else {
            alert('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    }

    const change2ndPassword = (e) => {
        setChangePW(e.target.value);
    }
    const change2ndPasswordConfirm = (e) => {
        setConfirmChangePW(e.target.value);
    }
    const change2ndPasswordFunction = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const tkEmail = decodedToken.email;

        if (changePW != confirmChangePW) {
            setWrongConfirmPW(true);
        } else if (token) {
            try {
                const response = await fetch('http://182.209.228.24:8484/admin-change-2ndpassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tkEmail,
                        changePW,
                    }),
                })
                if (response.status === 200) {
                    setWrongConfirmPW(false);
                    alert('비밀번호를 변경했습니다.');
                    setIsLogin('afterLogin')
                    setShowPassword(false);
                    setShowPassword2(false);
                    setChangePW('');
                    setConfirmChangePW('');
                }
            } catch (err) {
                console.log('비밀번호 변경 도중 에러 발생 : ', err)
            }
        } else {
            alert('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    }

    //운영자 설정 관련 함수
    const fetchManagers = async () => {
        try {
            const response = await fetch('http://182.209.228.24:8484/admin-getManager');
            const data = await response.json();

            if (response.ok) {
                const sortedManagers = data.sort((a, b) => {
                    return new Date(a.setManagerDate) - new Date(b.setManagerDate);
                });
                setManagers(sortedManagers);
            } else {
                console.log('Error fetching managers', data.error);
            }
        } catch (err) {
            console.log('Error fetching manager', err)
        }
    }

    const handleAddManager = async () => {
        if (!newManagerEmail) return;

        try {
            const response = await fetch('http://182.209.228.24:8484/admin-addManager', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    managerEmail: newManagerEmail,
                    setManagerDate: new Date(),
                })
            })

            if (response.ok) {
                setNewManagerEmail('');
                fetchManagers();
                setThereIsNoManager(false);
            } else if (response.status === 404) {
                setThereIsNoManager(true);
            } else {
                const data = await response.json();
                console.log('error adding manager', data.error);
            }
        } catch (err) {
            console.log('error adding manager', err)
        }
    }

    const handleDeleteManager = async (managerEmail) => {
        try {
            const response = await fetch(`http://182.209.228.24:8484/admin-delManager/${managerEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ managerEmail })
            })

            if (response.ok) {
                fetchManagers();
            } else {
                const data = await response.json();
                console.log('error delete manager', data.error)
            }
        } catch (err) {
            console.log('error delete manager', err);
        }
    }


    return (
        <div>
            <div className='adminpage-top'>파주 SDGs 플랫폼</div>

            <div style={{ width: "1000px", margin: "0 auto", textAlign: "center" }}>
                <div style={{ marginTop: "120px", width: "1000px", height: "100px" }}>
                    <div className='adminpage-goToHome' onClick={goToHome}><img src={`${process.env.PUBLIC_URL}/goToHome.png`} /></div>

                </div>
                <div style={{ width: "1000px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h1 style={{ marginBottom: "10px", fontSize: "24px" }}>파주시지속가능발전협의회</h1>
                    <h1 style={{ fontSize: "24px" }}>관리자 페이지</h1>
                </div>
            </div>



            {isLogin == '' && (

                <div style={{ width: "1000px", margin: "0 auto", textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                        <div style={{ width: "200px", height: "110px" }}>
                            <h2 style={{ fontSize: "20px", marginTop: "5px" }}>이메일</h2>
                            <h2 style={{ fontSize: "20px", marginTop: "55px" }}>비밀번호</h2>
                        </div>
                        <div style={{ width: "340px", height: "110px" }}>
                            <input className='adminpage-logininput' type="text" onChange={handleChangeEmail} />
                            <input className='adminpage-logininput'
                                type={showPassword ? 'text' : 'password'}
                                style={{ marginTop: "45px" }}
                                onChange={handleChangePassword}
                            />
                            <button className='adminpage-showpassword' onClick={hidePassword}><img src={`${process.env.PUBLIC_URL}/eye.png`} /></button>
                        </div>
                    </div>
                    <div style={{ position: "absolute", width: "1000px", height: "25px", marginTop: "30px", textAlign: "center", color: "red" }}>
                        {wrongEmail && <p>잘못된 이메일 혹은 비밀번호입니다.</p>}
                    </div>
                    <button className='adminpage-login' onClick={handleLogin}>로그인</button>
                </div>
            )}

            {isLogin == 'afterLogin' && (
                <div style={{ width: "1000px", height: "300px", margin: "0 auto", position: "relative", textAlign: "center", border: "1px solid transparent" }}>
                    <button className='adminpage-logout' onClick={handleLogout}>로그아웃</button>
                    <div className='adminpage-afterlogin'>
                        <p onClick={goToSetManager}>운영자 설정</p>
                        <p onClick={goToSetEmail}>이메일 설정</p>
                        <p onClick={goToChangePassword}>로그인 비밀번호 변경</p>
                        <p onClick={goToChange2ndPassword}>2차 비밀번호 변경</p>
                    </div>
                    <div></div>
                </div>

            )}
            {isLogin == '2ndpw' && (
                <div style={{ width: "1000px", margin: "0 auto", textAlign: "center", position: "relative", border: "1px solid transparent" }}>
                    <button className='adminpage-logout' onClick={handleCancle}>돌아가기</button>
                    <p style={{ marginTop: "70px", fontSize: "18px" }}>2차 비밀번호를 입력하세요.</p>
                    <input className='adminpage-logininput'
                        type={showPassword ? 'text' : 'password'}
                        style={{ marginTop: "30px" }}
                        onChange={handleChange2ndPassword}
                    />
                    <button style={{ marginTop: "37px" }} className='adminpage-showpassword' onClick={hidePassword}><img src={`${process.env.PUBLIC_URL}/eye.png`} /></button>
                    <div style={{ position: "absolute", width: "1000px", height: "25px", marginTop: "30px", textAlign: "center", color: "red" }}>
                        {wrong2ndPassword && <p>잘못 입력하셨습니다. 확인 후 다시 입력해 주세요.</p>}
                    </div>
                    <div>
                        <button className='adminpage-2ndlogin' onClick={handle2ndLogin}>로그인</button>
                    </div>
                </div>
            )}
            {isLogin == 'changePassword' && (
                <div style={{ width: "1000px", margin: "0 auto", textAlign: "center", position: "relative", border: "1px solid transparent" }}>
                    <button className='adminpage-logout' onClick={handleCancle}>돌아가기</button>
                    <p className='adminpage-p1'>비밀번호 변경</p>

                    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                        <div style={{ width: "200px", height: "110px" }}>
                            <h2 style={{ fontSize: "20px", marginTop: "5px" }}>변경할 번호 입력</h2>
                            <h2 style={{ fontSize: "20px", marginTop: "55px" }}>번호 확인</h2>
                        </div>
                        <div style={{ width: "340px", height: "110px" }}>
                            <input className='adminpage-logininput'
                                type={showPassword2 ? 'text' : 'password'}
                                onChange={changePassword}
                            />

                            <input className='adminpage-logininput'
                                type={showPassword ? 'text' : 'password'}
                                style={{ marginTop: "45px" }}
                                onChange={changePasswordConfirm}
                            />
                            <div style={{ position: "absolute" }}>
                                {wrongConfirmPW && (<p style={{ color: "red", marginLeft: "5px", marginTop: "5px" }}>비밀번호가 일치하지 않습니다.</p>)}
                            </div>
                            <button className='adminpage-showpassword' onClick={hidePassword2}
                                style={{ marginTop: "-25px" }}>
                                <img src={`${process.env.PUBLIC_URL}/eye.png`} /></button>
                            <button className='adminpage-showpassword' onClick={hidePassword}><img src={`${process.env.PUBLIC_URL}/eye.png`} /></button>
                        </div>
                        <button className='adminpage-2ndlogin' style={{ marginTop: "180px", marginLeft: "0px" }} onClick={changePasswordFunction}>확인</button>
                    </div>

                </div>
            )}

            {isLogin == 'change2ndPassword' && (
                <div style={{ width: "1000px", margin: "0 auto", textAlign: "center", position: "relative", border: "1px solid transparent" }}>
                    <button className='adminpage-logout' onClick={handleCancle}>돌아가기</button>
                    <p className='adminpage-p1'>2차 비밀번호 변경</p>

                    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                        <div style={{ width: "200px", height: "110px" }}>
                            <h2 style={{ fontSize: "20px", marginTop: "5px" }}>변경할 번호 입력</h2>
                            <h2 style={{ fontSize: "20px", marginTop: "55px" }}>번호 확인</h2>
                        </div>
                        <div style={{ width: "340px", height: "110px" }}>
                            <input className='adminpage-logininput'
                                type={showPassword2 ? 'text' : 'password'}
                                onChange={change2ndPassword}
                            />

                            <input className='adminpage-logininput'
                                type={showPassword ? 'text' : 'password'}
                                style={{ marginTop: "45px" }}
                                onChange={change2ndPasswordConfirm}
                            />
                            <div style={{ position: "absolute" }}>
                                {wrongConfirmPW && (<p style={{ color: "red", marginLeft: "5px", marginTop: "5px" }}>비밀번호가 일치하지 않습니다.</p>)}
                            </div>
                            <button className='adminpage-showpassword' onClick={hidePassword2}
                                style={{ marginTop: "-25px" }}>
                                <img src={`${process.env.PUBLIC_URL}/eye.png`} /></button>
                            <button className='adminpage-showpassword' onClick={hidePassword}><img src={`${process.env.PUBLIC_URL}/eye.png`} /></button>
                        </div>
                        <button className='adminpage-2ndlogin' style={{ marginTop: "180px", marginLeft: "0px" }} onClick={change2ndPasswordFunction}>확인</button>
                    </div>

                </div>
            )}

            {/* 운영자 설정 프론트 */}
            {isLogin == 'setManager' && (
                <div style={{ width: "1000px", margin: "0 auto", textAlign: "center", position: "relative", border: "1px solid transparent" }}>
                    <button className='adminpage-logout' onClick={handleCancle}>돌아가기</button>
                    <p className='adminpage-p1' style={{ marginBottom: "20px" }}>운영자 설정</p>


                    <table style={{ width: "700px", margin: "0 auto" }}>
                        <thead style={{ lineHeight: "60px", borderTop: "1px solid black", borderBottom: "1px solid black" }}>
                            <tr>
                                <th style={{ fontSize: "20px" }}>회원 이메일</th>
                                <th style={{ fontSize: "20px" }}>회원 이름</th>
                                <th style={{ fontSize: "20px" }}>설정</th>
                            </tr>
                        </thead>
                        <tbody style={{ lineHeight: "40px" }}>
                            <tr style={{ height: "20px" }} />
                            {managers.map((manager) => (
                                <tr key={manager._id}>
                                    <td style={{ fontSize: "20px" }}>{manager.email}</td>
                                    <td style={{ fontSize: "20px" }}>{manager.userName}</td>
                                    <td style={{ fontSize: "20px" }}>
                                        <button className='adminpage-delmanager-btn' onClick={() => handleDeleteManager(manager.email)}>해제</button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <input
                                        className='adminpage-addmanager-input'
                                        type="email"
                                        placeholder='이메일 입력 후 추가를 눌러 주세요'
                                        value={newManagerEmail}
                                        onChange={(e) => setNewManagerEmail(e.target.value)}
                                    />
                                </td>
                                <td></td>
                                <td>
                                    <button className='adminpage-delmanager-btn' onClick={handleAddManager}>추가</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ position: "absolute", textAlign: "center", left: "50%", transform: "translateX(-50%)", marginTop: "50px" }}>
                        {thereIsNoManager && (<p style={{ color: "red", textAlign: "center" }}>해당 이메일에 일치되는 회원을 찾을 수 없습니다.</p>)}
                    </div>


                </div>
            )}




        </div>
    )
}

export default AdminPage