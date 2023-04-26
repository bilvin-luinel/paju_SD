import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IntroMore from './IntroMore';
import LibMore from './LibMore';
import SDGsMore from './SDGsMore';
import SDMore from './SDMore';
import CommuMore from './CommuMore';
import store from '../store';
import { useDispatch, useSelector } from 'react-redux';

const TopBar = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    const navigate = useNavigate();

    const goToMain = () => {
        navigate('/');
    }
    const handleLogout = async () => {
        const response = await fetch('http://182.209.228.24:8484/logout', {
            method: 'POST',
            credentials: 'same-origin'
        });

        if (response.ok) {
            store.dispatch({ type: 'LOGOUT' });
            navigate('/');
        } else {
            alert("알 수 없는 오류로 로그아웃에 실패했습니다.");
        }
    }
    return (
        <div>
            <div className="header-top-back">
                <div className="header-top">
                    <img className="top-logo" src={`${process.env.PUBLIC_URL}/main-logo.png`} onClick={goToMain} alt="지속가능발전협의회 로고" />
                    <div className="header-top-container">
                        {!isLoggedIn ? <a href="/login">로그인</a> : <a onClick={handleLogout}>로그아웃</a>}
                        {!isLoggedIn ? <a href="/signup">회원가입</a> : <a href="#">마이페이지</a>}

                        <input className="search-input" placeholder="검색어를 입력해 주세요." type="text" />
                        <img className="search-btn" src={require('../img/icon/search_btn.png')} alt="검색 버튼" />
                    </div>
                </div>
            </div>

            <div className="navbar-wrap">
                <div className="navbar">
                    <div className="navbar-intro">
                        지속가능발전협의회
                        <div className="intro-more"><IntroMore /></div>
                    </div>
                    <div className="navbar-sd">
                        지속가능발전목표 SDGs
                        <div className="sd-more"><SDMore /></div>
                    </div>
                    {/* <div className="navbar-sdgs">
                        분과
                        <div className="sdgs-more"><SDGsMore /></div>
                    </div> */}
                    <div className="navbar-lib">
                        함께하는 파주
                        <div className="lib-more"><LibMore /></div>
                    </div>
                    <div className="navbar-notice">
                        커뮤니티
                        <div className="commu-more"><CommuMore /></div>
                    </div>
                    {/* <div className="navbar-calendar">함께하는 파주</div> */}
                    <img className="navbar-plus" src={require('../img/icon/plus.png')} alt="메뉴 더 보기" />
                </div>
            </div>
        </div>


    )
}

export default TopBar