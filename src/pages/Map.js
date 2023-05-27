import React, { useEffect, useState } from 'react'
import Warning from '../component/Warning';

const { kakao } = window;

const Map = () => {

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);

    const openModal1 = () => {
        setModal1(true);
    }
    const closeModal1 = () => {
        setModal1(false);
    }
    const openModal2 = () => {
        setModal2(true);
    }
    const closeModal2 = () => {
        setModal2(false);
    }

    const clickButton3 = () => {
        if (modal1 == true) {
            setModal1(false);
        } else {
            setModal1(true);
        }
    }

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.7588086, 126.7804444),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);

        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    }, [])


    return (
        <div>
            <div className='map' id='map'>
                <div className='map-btnbar'>
                    <div className='map-btn1'>
                        <span>시민과 함께 만드는 파주시 지속가능발전목표(SDGs) 지도</span>
                    </div>
                    <input className='map-btn2' type='text' placeholder='파주시 내 주소나 명칭을 검색하세요' />
                    <div className='map-btn3' onClick={clickButton3}>
                        <span>SDGs</span>
                    </div>
                    <div className='map-btn4'>
                        <span className='map-btn4-black'>경기도</span>
                        <span className='map-btn4-gray'>&gt;</span>
                        <span className='map-btn4-black'>파주시</span>
                        <span className='map-btn4-gray'>&gt;</span>
                        <span className='map-btn4-black'>운정 1동</span>
                    </div>
                    <div className='map-btn4-1'>운정 1동</div>
                </div>

                {modal1 && (
                    <div className='map-modal1'>

                    </div>
                )}
                {modal2 ? (
                    <div className='map-modal2'>
                        <button className='map-modal2-close' onClick={closeModal2}>&lt;</button>
                    </div>
                ) : (
                    <button className='map-modal2-cancel' onClick={openModal2}>Information</button>
                ) }

            </div>
        </div>
    )
}

export default Map