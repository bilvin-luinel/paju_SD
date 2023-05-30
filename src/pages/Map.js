import React, { useEffect, useRef, useState } from 'react'
import Warning from '../component/Warning';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const { kakao } = window;
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const Map = () => {

    //Data
    const modal2_line = [
        '빈곤층 감소와 사회안전망 강화',
        '식량안보 및 지속가능한 농업 강화',
        '건강하고 행복한 삶 보장',
        '모두를 위한 양질의 교육 세부목표 10개 지표 28개',
        '성평등 보장',
        '건강하고 안전한 물 관리',
        '에너지의 친환경적 생산과 소비',
        '좋은 일자리 확대와 경제성장',
        '산업의 성장과 혁신 활성화 및 사회기반시설 구축',
        '모든 종류의 불평등 해소',
        '지속가능한 도시와 주거지',
        '지속가능한 생산과 소비',
        '기후변화와 대응',
        '해양생태계 보전',
        '육상생태계 보전',
        '평화·정의·포용',
        '지구촌 협력 강화',
        '수리부엉이',
        '뜸부기',
        '금개구리'
    ];

    const categoryOption = [
        { value: '1', label: '빈곤층 감소와 사회안전망 강화' },
        { value: '2', label: '식량안보 및 지속가능한 농업 강화' },
        { value: '3', label: '건강하고 행복한 삶 보장' },
        { value: '4', label: '모두를 위한 양질의 교육 세부목표 10개 지표 28개' },
        { value: '5', label: '성평등 보장' },
        { value: '6', label: '건강하고 안전한 물 관리' },
        { value: '7', label: '에너지의 친환경적 생산과 소비' },
        { value: '8', label: '좋은 일자리 확대와 경제성장' },
        { value: '9', label: '산업의 성장과 혁신 활성화 및 사회기반시설 구축' },
        { value: '10', label: '모든 종류의 불평등 해소' },
        { value: '11', label: '지속가능한 도시와 주거지' },
        { value: '12', label: '지속가능한 생산과 소비' },
        { value: '13', label: '기후변화와 대응' },
        { value: '14', label: '해양생태계 보전' },
        { value: '15', label: '육상생태계 보전' },
        { value: '16', label: '평화·정의·포용' },
        { value: '17', label: '지구촌 협력 강화' },
        { value: '18', label: '수리부엉이' },
        { value: '19', label: '뜸부기' },
        { value: '20', label: '금개구리' },
    ];


    //React Hook
    const mapRef = useRef(null);
    const [modal1, setModal1] = useState(true);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [markerCurosr, setMarkerCursor] = useState(false);
    const [centerX, setCenterX] = useState('');
    const [centerY, setCenterY] = useState('');
    const [searchLoca, setSearchLoca] = useState('');
    const [currentLocation, setCurrentLocation] = useState('금촌1동');
    const [addCategory1, setAddCategory1] = useState('');
    const [addCategory2, setAddCategory2] = useState('');
    const [addCategory3, setAddCategory3] = useState('');
    const [name, setName] = useState('');
    const [loca, setLoca] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState([]);
    const [poster, setPoster] = useState('');
    const [category, setCategory] = useState(0);

    const navigate = useNavigate();


    let markerData = [];
    let markers = [];

    useEffect(() => {

        // //마커 정보 로드
        // const fetchData = async () => {
        //     try {
        //         const response = await fetch('http://182.209.228.24:8484/loadmarker');
        //         const positions = await response.json();
        //         for (let i = 0; i < positions.length; i++) {
        //             // markerData[i] = {};

        //             markerData.push({
        //                 title: positions[i].markerName,
        //                 x: positions[i].xCoordinate,
        //                 y: positions[i].yCoordinate,
        //                 location: positions[i].loca,
        //                 category1: positions[i].category1,
        //                 category2: positions[i].category2,
        //                 category3: positions[i].category3,
        //                 content: positions[i].content,
        //                 image: positions[i].image,
        //                 id: positions[i]._id,
        //                 date: positions[i].date,
        //                 poster: positions[i].poster
        //             })
        //         }


        //         const createMarkers = () => {
        //             // if (c == 0) {
        //             for (let i = 0; i < markerData.length; i++) {
        //                 const imageSize = new kakao.maps.Size(25, 25);
        //                 const imageSrc = `${process.env.PUBLIC_URL}/${markerData[i].category1}.png`;
        //                 const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        //                 const marker = new kakao.maps.Marker({
        //                     map: map,
        //                     position: new kakao.maps.LatLng(markerData[i].x, markerData[i].y),
        //                     title: markerData[i].title,
        //                     image: markerImage
        //                 })
        //                 marker.setMap(null);
        //                 markers.push(marker);
        //             }


        // }
        // else {
        //     for (let i = 0; i < markerData.length; i++) {
        //         if (c == markerData[i].category1) {
        //             const imageSize = new kakao.maps.Size(25, 25);
        //             const imageSrc = `${process.env.PUBLIC_URL}/${markerData[i].category1}.png`;
        //             const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        //             const marker = new kakao.maps.Marker({
        //                 map: map,
        //                 position: new kakao.maps.LatLng(markerData[i].x, markerData[i].y),
        //                 title: markerData[i].title,
        //                 image: markerImage
        //             })
        //             marker.setMap(map);
        //         }
        //     }
        // }

        //         }
        //         createMarkers(category);
        //         showMarker(map);
        //         console.log('마커스의 정보', markers);
        //     } catch (err) {
        //         console.log('마커 데이터 불러오다 사고남', err);
        //     }
        // }
        // fetchData();

        //지도 생성
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.75907204876572, 126.7808987771656),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);

        //스카이뷰 +/- 등 사용자 컨트롤 추가
        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        //클릭해서 마커 찍기 + 마커 이미지 커스텀
        const clickImageSrc = `${process.env.PUBLIC_URL}/marker_cursor.png`,
            clickImageSize = new kakao.maps.Size(50, 60),
            clickImageOption = { offset: new kakao.maps.Point(25, 50) }; //수치 조정으로 클릭 시 마커 위치 정밀 조정
        const markerImage = new kakao.maps.MarkerImage(clickImageSrc, clickImageSize, clickImageOption);

        const clickMarker = new kakao.maps.Marker({
            // 시작하자마자 가운데에 마커 찍기
            // position: map.getCenter(),

            image: markerImage
        });
        clickMarker.setMap(map);


        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            clickMarker.setMap(map);
            const latlng = mouseEvent.latLng;
            clickMarker.setPosition(latlng);
            console.log('위도 :', latlng.getLat(), '경도 :', latlng.getLng());

            setCenterX(latlng.getLat());
            setCenterY(latlng.getLng());
        })

        //latlng.getLat() 위도 확인
        //latlng.getLng() 경도 확인

        //일단 테스트
        kakao.maps.event.addListener(clickMarker, 'click', function (mouseEvent) {
            // const latlng = mouseEvent.latLng;
            clickMarker.setMap(null);
            // console.log('위도 :', latlng.getLat(), '경도 :', latlng.getLng());

            // setCenterX(latlng.getLat());
            // setCenterY(latlng.getLng());
        })


        mapRef.current = map;
    }, [])


    const superDel = () => {
        markers.splice(0, markers.length);
        markers = [];
    }
    const showMarker = (map) => {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map)
        }
    }


    useEffect(() => {
        const map = mapRef.current;
        // showMarker(null);

        //마커 정보 로드
        const fetchData = async () => {
            try {
                const response = await fetch('http://182.209.228.24:8484/loadmarker');
                const positions = await response.json();
                for (let i = 0; i < positions.length; i++) {
                    // markerData[i] = {};

                    markerData.push({
                        title: positions[i].markerName,
                        x: positions[i].xCoordinate,
                        y: positions[i].yCoordinate,
                        location: positions[i].loca,
                        category1: positions[i].category1,
                        category2: positions[i].category2,
                        category3: positions[i].category3,
                        content: positions[i].content,
                        image: positions[i].image,
                        id: positions[i]._id,
                        date: positions[i].date,
                        poster: positions[i].poster
                    })
                }


                const createMarkers = (c) => {
                    if (c == 0) {
                        markers = [];
                        for (let i = 0; i < markerData.length; i++) {
                            const imageSize = new kakao.maps.Size(25, 25);
                            const imageSrc = `${process.env.PUBLIC_URL}/${markerData[i].category1}.png`;
                            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
                            const marker = new kakao.maps.Marker({
                                map: map,
                                position: new kakao.maps.LatLng(markerData[i].x, markerData[i].y),
                                title: markerData[i].title,
                                image: markerImage
                            })
                            marker.setMap(null);
                            markers.push(marker);
                        }

                        showMarker(map);

                    }
                    else {
                        markers = [];
                        for (let i = 0; i < markerData.length; i++) {
                            if (c == markerData[i].category1) {
                                const imageSize = new kakao.maps.Size(25, 25);
                                const imageSrc = `${process.env.PUBLIC_URL}/${markerData[i].category1}.png`;
                                const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
                                const marker = new kakao.maps.Marker({
                                    map: map,
                                    position: new kakao.maps.LatLng(markerData[i].x, markerData[i].y),
                                    title: markerData[i].title,
                                    image: markerImage
                                })
                                marker.setMap(null);
                                markers.push(marker);
                            }
                        }
                        showMarker(map);
                    }

                }
                createMarkers(category);
            } catch (err) {
                console.log('마커 데이터 불러오다 사고남', err);
            }
        }
        fetchData();

    }, [category])

    // useEffect(() => {
    //     const map = mapRef.current;

    //     // 마커 삭제 함수
    //     const superDel = () => {
    //         for (let i = 0; i < markers.length; i++) {
    //             markers[i].setMap(null);
    //         }
    //         markers.splice(0, markers.length);
    //     };

    //     // 마커 표시 함수
    //     const showMarker = (map) => {
    //         for (let i = 0; i < markers.length; i++) {
    //             markers[i].setMap(map);
    //         }
    //     };

    //     // 마커 정보 로드
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://182.209.228.24:8484/loadmarker');
    //             const positions = await response.json();

    //             // markerData 초기화
    //             markerData.length = 0;

    //             for (let i = 0; i < positions.length; i++) {
    //                 markerData.push({
    //                     title: positions[i].markerName,
    //                     x: positions[i].xCoordinate,
    //                     y: positions[i].yCoordinate,
    //                     location: positions[i].loca,
    //                     category1: positions[i].category1,
    //                     category2: positions[i].category2,
    //                     category3: positions[i].category3,
    //                     content: positions[i].content,
    //                     image: positions[i].image,
    //                     id: positions[i]._id,
    //                     date: positions[i].date,
    //                     poster: positions[i].poster
    //                 });
    //             }

    //             const createMarkers = (c) => {
    //                 // 마커 생성 전에 기존 마커 삭제
    //                 superDel();

    //                 for (let i = 0; i < markerData.length; i++) {
    //                     if (c === 0 || c === markerData[i].category1) {
    //                         const imageSize = new kakao.maps.Size(25, 25);
    //                         const imageSrc = `${process.env.PUBLIC_URL}/${markerData[i].category1}.png`;
    //                         const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    //                         const marker = new kakao.maps.Marker({
    //                             map: map,
    //                             position: new kakao.maps.LatLng(markerData[i].x, markerData[i].y),
    //                             title: markerData[i].title,
    //                             image: markerImage
    //                         });
    //                         marker.setMap(map);
    //                         markers.push(marker);
    //                     }
    //                 }
    //             };

    //             createMarkers(category);
    //         } catch (err) {
    //             console.log('마커 데이터 불러오다 사고남', err);
    //         }
    //     };

    //     fetchData();

    // }, [category]);



    useEffect(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(searchLoca, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                const map = mapRef.current;
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                });

                map.setCenter(coords);
            }
        });

        const ps = new kakao.maps.services.Places();


        const placesSearchCB = (data, status, pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                const map = mapRef.current;
                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }
                map.setBounds(bounds);
            }
        }
        const displayMarker = (place) => {
            const map = mapRef.current;
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            })

            kakao.maps.event.addListener(marker, 'click', function () {
                //마커 클릭 시 장소명이 인포윈도우에 표출됨
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            })
        }
        ps.keywordSearch(searchLoca, placesSearchCB);

    }, [searchLoca]);

    useEffect(() => {
        const geocoder = new kakao.maps.services.Geocoder();
        const map = mapRef.current;

        let debounceTimer;

        const handleCenterChanged = debounce(() => {
            const center = map.getCenter();
            searchAddrFromCoords(center, displayCenterInfo);
        }, 300)

        kakao.maps.event.addListener(map, 'center_changed', handleCenterChanged)

        function searchAddrFromCoords(coords, callback) {
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                const address = result.find(item => item.region_type === 'H');
                if (address) {
                    removePaju(address.address_name);
                }
            }
        }

        console.log('현재 읍면동 정보 : ', currentLocation);

        // Clean up
        return () => {
            kakao.maps.event.removeListener(map, 'center_changed', handleCenterChanged);
            clearTimeout(debounceTimer);
        }


        //----------------------
        // searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        // function searchAddrFromCoords(coords, callback) {
        //     // 좌표로 행정동 주소 정보를 요청합니다
        //     geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        // }

        // function displayCenterInfo(result, status) {
        //     if (status === kakao.maps.services.Status.OK) {
        //         var infoDiv = document.getElementById('centerAddr');

        //         for (var i = 0; i < result.length; i++) {
        //             // 행정동의 region_type 값은 'H' 이므로
        //             if (result[i].region_type === 'H') {
        //                 infoDiv.innerHTML = result[i].address_name;
        //                 break;
        //             }
        //         }
        //     }
        // }

    }, [mapRef.current, currentLocation])




    // Function
    function debounce(func, wait) {
        let timeout;

        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }



    const goToHQ = () => {
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7588086, 126.7804444);
        map.setCenter(moveLatLon);
    }



    const openModal2 = () => {
        setModal2(true);
    }
    const closeModal2 = () => {
        setModal2(false);
    }

    const clickButton3 = () => {
        console.log('from clickButton3', markers)
        const noState = document.getElementById('map-modal1');
        if (noState) {
            noState.style.display = noState.style.display === 'none' ? 'block' : 'none';
        }



        // if (modal1 == true) {
        //     setModal1(false);
        // } else {
        //     setModal1(true);
        // }
    }

    const clickButton4 = () => {
        if (modal3 == true) {
            setModal3(false);
        } else {
            setModal3(true);
        }
    }
    // const addBTClick = () => {
    //     setMarkerCursor(true);
    //     console.log(markerCurosr)
    // }
    // const addBTOff = () => {
    //     setMarkerCursor(false);
    // }

    const inputNull = () => {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null)
        }
    }
    const handleCategoryClick = async (idx) => {
        setModal2(true);

        console.log('바로마커스', markers)
        await inputNull();
        // markers = [];
        setCategory(idx);
        console.log('현재마커스', markers)
    }
    const clickWholeBtn = async () => {
        console.log('바로마커스', markers)
        await inputNull();
        // markers = [];
        setCategory(0);
        console.log('현재마커스', markers)


    }
    const searchLocation = (e) => {
        setSearchLoca(e.target.value);
    }

    const removePaju = (address) => {
        const prefix = '경기도 파주시';
        if (address.startsWith(prefix)) {
            setCurrentLocation(address.substring(prefix.length).trim())
        } else {
            setCurrentLocation('시외');
        }
    }







    //행정동 이동 관련 함수
    const go1 = () => {
        setCurrentLocation('문산읍');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.8567429, 126.790438);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go2 = () => {
        setCurrentLocation('조리읍');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.744742, 126.8051987);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go3 = () => {
        setCurrentLocation('법원읍');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.849062, 126.882353);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go4 = () => {
        setCurrentLocation('파주읍');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.832687, 126.819152);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go5 = () => {
        setCurrentLocation('광탄면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7760902, 126.8516426);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go6 = () => {
        setCurrentLocation('탄현면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.8024426, 126.716178);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go7 = () => {
        setCurrentLocation('월롱면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.799368, 126.789774);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go8 = () => {
        setCurrentLocation('적성면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.954208, 126.917881);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go9 = () => {
        setCurrentLocation('파평면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.921439, 126.8379569);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go10 = () => {
        setCurrentLocation('군내면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.9319458, 126.7283000);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go11 = () => {
        setCurrentLocation('장단면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.9062269, 126.7310796);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go12 = () => {
        setCurrentLocation('진동면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.940431, 126.799860);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go13 = () => {
        setCurrentLocation('진서면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.9514586, 126.7134711);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go14 = () => {
        setCurrentLocation('교하동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.752483, 126.746941);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go15 = () => {
        setCurrentLocation('운정1동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.724233, 126.7512977);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go16 = () => {
        setCurrentLocation('운정2동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7239199, 126.7515154);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go17 = () => {
        setCurrentLocation('운정3동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7168025, 126.7433708);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go18 = () => {
        setCurrentLocation('운정4동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7191693, 126.7685742);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go19 = () => {
        setCurrentLocation('운정5동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7202108, 126.7108133);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go20 = () => {
        setCurrentLocation('운정6동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7199121, 126.7224236);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go21 = () => {
        setCurrentLocation('금촌1동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7663105, 126.775981);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go22 = () => {
        setCurrentLocation('금촌2동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7517308, 126.7774006);
        map.setCenter(moveLatLon);
        setModal3(false);
    }
    const go23 = () => {
        setCurrentLocation('금촌3동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7712163, 126.778153);
        map.setCenter(moveLatLon);
        setModal3(false);
    }



    //등록 관련
    const clickAddBT = async () => {
        const rrs = await fetch('http://182.209.228.24:8484/user', {
            method: 'GET',
            credentials: 'include'
        })
            .then(rrs => rrs.json())
            .then(data => {
                if (!data.user || typeof data.user.nickName === 'undefined') {
                    console.log("???")
                    alert('로그인이 필요합니다');
                } else if (centerX) {
                    setAddModal(true);
                } else {
                    alert('좌표를 먼저 찍어 주세요');
                }
            })
    }
    const closeAddBT = () => {
        setAddModal(false);
    }
    const handleImageChange = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setImage([...image, file]);
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleLocaChange = (e) => {
        setLoca(e.target.value);
    }
    const handleContentChange = (e) => {
        setContent(e.target.value);
    }
    const handleCategoryChange1 = (e) => {
        setAddCategory1(e);
    }
    const handleCategoryChange2 = (e) => {
        setAddCategory2(e);
    }
    const handleCategoryChange3 = (e) => {
        setAddCategory3(e);
    }
    const handleSubmit = async () => {

        const rrs = await fetch('http://182.209.228.24:8484/user', {
            method: 'GET',
            credentials: 'include'
        })
            .then(rrs => rrs.json())
            .then(data => {
                setPoster(data.user.nickName);
            })
        if (!name) {
            alert('등록할 장소의 이름을 입력해 주세요.')
        } else if (!loca) {
            alert('등록할 장소의 위치를 입력해 주세요.')
        } else if (!addCategory1) {
            alert('등록할 장소와 관련된 SDGs를 선택해 주세요.')
        } else if (!addCategory2) {
            alert('등록할 장소와 관련된 SDGs를 선택해 주세요.')
        } else if (!addCategory3) {
            alert('등록할 장소와 관련된 SDGs를 선택해 주세요.')
        } else if (!content) {
            alert('등록할 장소의 내용을 입력해 주세요.')
        } else {
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('loca', loca);
                formData.append('content', content);
                formData.append('category1', addCategory1?.value);
                formData.append('category2', addCategory2?.value);
                formData.append('category3', addCategory3?.value);
                formData.append('xCoordinate', centerX);
                formData.append('yCoordinate', centerY);
                formData.append('poster', poster)
                image.forEach((image) => {
                    formData.append('image', image);
                });

                console.log(':::', formData.get('poster'));

                const response = await fetch('http://182.209.228.24:8484/addmarker', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                console.log(data);
                if (data.success == true) {
                    alert("글이 작성되었습니다.");
                    // navigate('../map')
                }
            } catch (error) {
                console.error(error);
            }
        }

    };


    return (
        <div>
            <div className='map' id='map'>
                <div className='map-btnbar'>
                    <div className='map-btn1'>
                        <span>시민과 함께 만드는 파주시 지속가능발전목표(SDGs) 지도</span>
                    </div>
                    <input className='map-btn2' type='text' placeholder='파주시 내 주소나 명칭을 검색하세요' onChange={searchLocation} />
                    <div className='map-btn3' onClick={clickButton3}>
                        <span>SDGs</span>
                    </div>
                    <div className='map-btn4'>
                        <span className='map-btn4-black'>경기도</span>
                        <span className='map-btn4-gray'>&gt;</span>
                        <span className='map-btn4-black'>파주시</span>
                        <span className='map-btn4-gray'>&gt;</span>
                        <span className='map-btn4-black' style={{ width: '60px' }}></span>
                    </div>
                    <div className='map-btn4-1' onClick={clickButton4}>{currentLocation}</div>
                    {modal3 && (
                        <div className='map-modal3'>
                            <ul>
                                <li onClick={go1}>문산읍</li>
                                <li onClick={go2}>조리읍</li>
                                <li onClick={go3}>법원읍</li>
                                <li onClick={go4}>파주읍</li>
                                <li onClick={go5}>광탄면</li>
                                <li onClick={go6}>탄현면</li>
                                <li onClick={go7}>월롱면</li>
                                <li onClick={go8}>적성면</li>
                                <li onClick={go9}>파평면</li>
                                <li onClick={go10}>군내면</li>
                                <li onClick={go11}>장단면</li>
                                <li onClick={go12}>진동면</li>
                                <li onClick={go13}>진서면</li>
                                <li onClick={go14}>교하동</li>
                                <li onClick={go15}>운정1동</li>
                                <li onClick={go16}>운정2동</li>
                                <li onClick={go17}>운정3동</li>
                                <li onClick={go18}>운정4동</li>
                                <li onClick={go19}>운정5동</li>
                                <li onClick={go20}>운정6동</li>
                                <li onClick={go21}>금촌1동</li>
                                <li onClick={go22}>금촌2동</li>
                                <li onClick={go23}>금촌3동</li>
                                <li></li>
                            </ul>
                        </div>
                    )}
                </div>


                <div className='map-aim' onClick={goToHQ}><img src={`${process.env.PUBLIC_URL}/aim.png`} /></div>
                {/* <div className={markerCurosr ? 'marker-cursor' : ''} onClick={addBTOff} /> */}
                <div className='map-add-btn' onClick={clickAddBT}><img src={`${process.env.PUBLIC_URL}/marker_add.png`} /></div>
                <div id='map-modal1' className='map-modal1' style={{ display: "none" }}>
                    <ul>
                        {[...Array(20)].map((_, index) => (
                            <li key={index + 1} onClick={() => handleCategoryClick(index + 1)}>
                                <img src={`${process.env.PUBLIC_URL}/${index + 1}.png`} alt={`Category ${index + 1}`} />
                            </li>
                        ))}
                    </ul>
                    <button className='map-modal1-btn' onClick={clickWholeBtn}>전체</button>
                </div>
                {modal2 ? (
                    <div className='map-modal2'>
                        <div className='map-modal2-header'><span>UN-SDGs 17개 목표 및 파주시 깃대종 소개</span></div>
                        <ul>
                            {[...Array(20)].map((_, index) => (
                                <li key={index + 1}>
                                    <img src={`${process.env.PUBLIC_URL}/1-${index + 1}.png`} alt={`img ${index + 1}`} />
                                    {index <= 16 ? (<p>{index + 1}.</p>) : null}
                                    <span>{modal2_line[index]}</span>
                                </li>
                            ))}
                        </ul>
                        <button className='map-modal2-close' onClick={closeModal2}><div className='map-modal2-triangle' /></button>
                    </div>
                ) : (
                    <button className='map-modal2-open' onClick={openModal2}>Information</button>
                )}


                {addModal && (
                    <div className='map-add-modal'>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                            <h1>신규등록제안</h1>
                            <div style={{ width: "20px", height: "20px", backgroundColor: "black", color: "white", textAlign: "center", marginLeft: "350px", position: "absolute", cursor: "pointer" }}
                                onClick={closeAddBT}>X</div>
                        </div>
                        <p className='map-add-modal-p1'>지속가능발전목표와 관련 있는 장소와 등록을 제안할 수 있습니다.</p>
                        <input className='map-add-imgbtn' type="file" name="images" accept="image/*" onChange={handleImageChange} />
                        <div className='map-add-imgbtn-1'>
                            <p>+사진추가</p>
                            <p style={{ fontSize: "12px" }}>(해당 장소를 확인할 수 있는 사진을 첨부해 주시면 등록이 빨라집니다.)</p>
                        </div>
                        <p style={{ marginLeft: "-350px", marginTop: "10px" }}>등록할 장소의 이름</p>
                        <input className='map-add-name' onChange={handleNameChange} type="text" name="map-add-name" style={{ marginTop: "10px", width: "480px", height: "35px" }} />
                        <p style={{ marginLeft: "-195px", marginTop: "10px", display: "flex", alignItems: "center" }}>위치
                            <p style={{ fontSize: "12px", marginLeft: "5px" }}>(정확한 위치를 입력하려면 화살표를 눌러 주세요)</p></p>
                        <input className='map-add-loca' onChange={handleLocaChange} type="text" name="map-add-loca" style={{ width: "480px", height: "35px", marginTop: "10px" }} />
                        <p style={{ marginLeft: "-270px", marginTop: "10px", display: "flex", alignItems: "center" }}>관련 SDGs
                            <p style={{ fontSize: "12px", marginLeft: "5px" }}>(1~3개를 선택해 주세요)</p></p>
                        <div className='map-add-cate-option'>
                            <Select className='map-add-cate1' options={categoryOption} onChange={handleCategoryChange1} value={addCategory1}>추가</Select>
                            <Select className='map-add-cate2' options={categoryOption} onChange={handleCategoryChange2} value={addCategory2}>추가</Select>
                            <Select className='map-add-cate3' options={categoryOption} onChange={handleCategoryChange3} value={addCategory3}>추가</Select>
                        </div>
                        <p style={{ marginLeft: "-250px", marginTop: "20px", display: "flex", alignItems: "center" }}>내용
                            <p style={{ fontSize: "12px", marginLeft: "5px" }}>(등록하고 싶은 이유 등을 적어 주세요.)</p></p>
                        <textarea className='map-add-content' onChange={handleContentChange} type="text" name="map-add-content" style={{ width: "480px", height: "100px", marginTop: "10px" }} />
                        <div style={{
                            display: "flex", width: "300px", height: "25px", position: "absolute"
                            , marginTop: "580px", marginLeft: "-180px"
                        }}>
                            <p className='map-add-modal-name' style={{}}>등록 제안 회원 :</p>
                            <p style={{ marginLeft: "10px" }}>누구누구누구누구</p>
                        </div>
                        <div style={{
                            display: "flex", width: "300px", height: "25px", position: "absolute"
                            , marginTop: "610px", marginLeft: "-180px"
                        }}>
                            <p className='map-add-modal-name' style={{}}>결과 받을 이메일 :</p>
                            <p style={{ marginLeft: "10px" }}>이메일이메일</p>
                        </div>
                        <div className='map-add-addbtn' onClick={handleSubmit}>확인</div>
                        <p style={{ marginTop: "10px" }}>확인 버튼을 누르면 등록 제안이 파주시지속가능발전협의회로 전송됩니다.</p>
                        <p>제안한 내용이 신규 등록되면 레벨 점수 20점을 드립니다. 감사합니다.</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Map