import React from 'react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import NewsCard from './NewsCard';

SwiperCore.use([Pagination, Autoplay]);

const MainSlide = () => {

    const prs = [
        { id: 1, imgSrc: `${process.env.PUBLIC_URL}/news1.png`, headline: '파주 운정호수공원 음악분수', content1: '5월부터 본격가동', content2: '매일 주,야간 각 1회 운영' },
        { id: 2, imgSrc: `${process.env.PUBLIC_URL}/news2.png`, headline: '파주시 어린이책잔치 개최', content1: `'다양성과 다문화'를 주제로`, content2: '5월 5~7일 파주에서 개최된다' },
        { id: 3, imgSrc: `${process.env.PUBLIC_URL}/news3.png`, headline: '파주시 공공데이터 우수기관 선정', content1: '파주시 공공데이터 제공 운영실태 평가', content2: '최고등급 우수기관 선정' },
        { id: 4, imgSrc: `${process.env.PUBLIC_URL}/news4.png`, headline: '지구의 날 기념 다양한 행사진행', content1: '파주시는 지구의 날 맞이', content2: '탄소중립 생활 실천 챌린지 진행' },
        { id: 5, imgSrc: `${process.env.PUBLIC_URL}/news5.png`, headline: '파주시, 동물학대와의 전쟁', content1: '경기도 특별사법경찰단', content2: '육견 농장 현장 적발, 수사 나서다' },
        { id: 6, imgSrc: `${process.env.PUBLIC_URL}/news6.png`, headline: '공릉천 튤립축제 개최', content1: '제1회 파주 공릉천 튤립축제', content2: '22일 공릉천에서 성황리에 열렸다' },
    ]

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
            {prs.map((e) => (
                <SwiperSlide className='swiper-slide' key={e.id}>
                    <NewsCard imgSrc={e.imgSrc} headline={e.headline} content1={e.content1} content2={e.content2} />
                </SwiperSlide>
            ))}

        </Swiper>
    );
};

export default MainSlide;