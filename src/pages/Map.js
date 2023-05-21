import React, { useEffect } from 'react'
import Warning from '../component/Warning';

const { kakao } = window;

const Map = () => {

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.732861, 126.751281),
            level: 1
        };
        const map = new kakao.maps.Map(container, options);

        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    }, [])


    return (
        <div>
            <div className='map' id='map'></div>
        </div>
    )
}

export default Map