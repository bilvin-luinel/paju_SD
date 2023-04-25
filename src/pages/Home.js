import React, { useState, Component } from 'react'
import TopBar from '../component/TopBar'
import UnderBar from '../component/UnderBar'
import Banner from '../component/Banner'
import ImageGallery from '../component/ImageGallery'
import { useNavigate } from 'react-router-dom'
import NewsCard from '../component/NewsCard'
import MainSlide from '../component/MainSlide'

const Home = () => {

    const navigate = useNavigate();


    return (
        <div className='wrap'>
            <TopBar />
            <div className='main'>
                <div className='main-line1'>
                    <MainSlide />
                    <img className='main-notice' src={`${process.env.PUBLIC_URL}/main-notice.png`} />
                </div>
                <div className='main-line2'>
                    <img className='main-monitoring' src={`${process.env.PUBLIC_URL}/main-monitoring.png`} />
                    <img className='main-map' src={`${process.env.PUBLIC_URL}/main-map.png`} />
                    <img className='main-calendar' src={`${process.env.PUBLIC_URL}/main-calendar.png`} />
                </div>
            </div>
            <UnderBar />
        </div>
    )
}

export default Home