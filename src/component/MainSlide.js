import React, { useEffect, useState } from 'react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import NewsCard from './NewsCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

SwiperCore.use([Pagination, Autoplay]);

const MainSlide = () => {

    const [noticeList, setNoticeList] = useState([]);

    useEffect(() => {
        const fetchNoticeList = async () => {
            const res = await axios.get('http://localhost:8484/is-notice');
            setNoticeList(res.data);
        };
        fetchNoticeList();
        console.log(noticeList);
    }, []);

    const navigate = useNavigate();

    return (
        <Swiper
            className='swiper'
            spaceBetween={22.5}
            slidesPerView={2}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerGroup={2}
            observer={true}
            observeParents={true}
        >
            {noticeList.map((e) => (
                <SwiperSlide className='swiper-slide' key={e._id}>
                    <div onClick={()=>navigate(`/news/${e._id}`)}>
                        <NewsCard imgSrc={`http://localhost:8484/uploads/${e.images}`} headline={e.title} content1={e.content} />
                    </div>
                </SwiperSlide>
            ))}

        </Swiper>
    );
};

export default MainSlide;