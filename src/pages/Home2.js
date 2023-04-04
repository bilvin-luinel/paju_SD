import React, { useState } from 'react'
import TopBar from '../component/TopBar'
import UnderBar from '../component/UnderBar'
import Slider from 'react-slick'
import Banner from '../component/Banner'
import ImageGallery from '../component/ImageGallery'
import { useNavigate } from 'react-router-dom'

const Home2 = () => {

    // 소개 ( 연혁 , 조직도 , 분과소개 , 인사말 , TF팀 소개)
    // 지속가능발전 ( 개념 , 배경, 지속가능발전법 , 국가의 실천노력 , 용어사전 )
    // 지속가능발전목표
    // 자료실
    // 공지사항
    // 캘린더
    const images = [
        `${process.env.PUBLIC_URL}/event1.png`,
        `${process.env.PUBLIC_URL}/event2.png`,
    ]

    const navigate = useNavigate();

    const go1 = () => {
        navigate('/');
    }
    const go2 = () => {
        navigate('/2');
    }
    const go3 = () => {
        navigate('/3');
    }
    const go4 = () => {
        navigate('/4');
    }
    const [click, setClick] = useState(1);

    return (
        <div className="wrap">
            <TopBar />
            <div className="main">
                <img className="main-banner" src={`${process.env.PUBLIC_URL}/main.png`} />
                <div className="main-1">
                    <div className="banner">
                        {/* <img src={`${process.env.PUBLIC_URL}/event1.png`} className="event-banner" /> */}
                        <ImageGallery images={images} />
                        {/* <img src={`${process.env.PUBLIC_URL}/event2.png`} className="event-banner" /> */}
                    </div>
                    <div className="news">
                        <div className="news-headhead">
                        <div className="news-head"  onClick={go1}>전체</div>
                            <div className="news-head"  style={{fontWeight: "bold"}} onClick={go2}>공지</div>
                            <div className="news-head" onClick={go3}>뉴스</div>
                            <div className="news-head" onClick={go4}>커뮤니티</div>
                        </div>
                        <div className="post">
                            <a href="#">1번 공지 게시물입니다.</a>
                            <a href="#">2번 공지 게시물입니다.</a>
                            <a href="#">3번 공지 게시물입니다.</a>
                            <a href="#">4번 공지 게시물입니다.</a>
                            <a href="#">5번 공지 게시물입니다.</a>
                        </div>

                    </div>
                </div>
            </div>
            <div className="button-div"><img src={`${process.env.PUBLIC_URL}/button.jpg`} className="button" /></div>
            <UnderBar />
        </div>
    )
}

export default Home2