import React, { useState, Component } from 'react'
import Banner from '../component/Banner'
import ImageGallery from '../component/ImageGallery'
import { useNavigate } from 'react-router-dom'
import NewsCard from '../component/NewsCard'
import MainSlide from '../component/MainSlide'
import TopBar from '../component/TopBar'
import UnderBar from '../component/UnderBar'

const Home = () => {

    const navigate = useNavigate();
    const goToMap = () => {
        navigate('/map');
    }
    const handleOpenPopup = () => {
        console.log('찍힘2')
    }

    return (
        <div>
            <TopBar />
            {/* <button onClick={handleOpenPopup} style={{width: "150px", height:"50px"}}>팝업 열기</button> */}
            <div className='super-wrap'>
                <img className='mobile' src={`${process.env.PUBLIC_URL}/mobile.jpg`} />
                <div className='wrap'>
                    <div className='main'>
                        <div className='main-line1'>
                            <MainSlide />
                            <img className='main-notice' src={`${process.env.PUBLIC_URL}/main-notice.png`} />
                        </div>
                        <div className='main-line2'>
                            <img className='main-monitoring' src={`${process.env.PUBLIC_URL}/main-monitoring.png`} />
                            <img className='main-map' onClick={goToMap} src={`${process.env.PUBLIC_URL}/main-map.png`} />
                            <img className='main-calendar' src={`${process.env.PUBLIC_URL}/main-calendar.png`} />
                        </div>
                    </div>
                </div>
            </div>
            <UnderBar />
        </div>

        // <div className='t1'>
        //     <img className='test' src={`${process.env.PUBLIC_URL}/test.jpg`} />
        // </div>

    )
}

export default Home