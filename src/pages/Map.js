import React, { useEffect, useRef, useState } from 'react'
import Warning from '../component/Warning';
import Select from 'react-select';
import { Redirect, useNavigate } from 'react-router-dom';

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
        { value: '0', label: '취소' },
        { value: '1', label: '1. 빈곤층 감소와 사회안전망 강화' },
        { value: '2', label: '2. 식량안보 및 지속가능한 농업 강화' },
        { value: '3', label: '3. 건강하고 행복한 삶 보장' },
        { value: '4', label: '4. 모두를 위한 양질의 교육 세부목표 10개 지표 28개' },
        { value: '5', label: '5. 성평등 보장' },
        { value: '6', label: '6. 건강하고 안전한 물 관리' },
        { value: '7', label: '7. 에너지의 친환경적 생산과 소비' },
        { value: '8', label: '8. 좋은 일자리 확대와 경제성장' },
        { value: '9', label: '9. 산업의 성장과 혁신 활성화 및 사회기반시설 구축' },
        { value: '10', label: '10. 모든 종류의 불평등 해소' },
        { value: '11', label: '11. 지속가능한 도시와 주거지' },
        { value: '12', label: '12. 지속가능한 생산과 소비' },
        { value: '13', label: '13. 기후변화와 대응' },
        { value: '14', label: '14. 해양생태계 보전' },
        { value: '15', label: '15. 육상생태계 보전' },
        { value: '16', label: '16. 평화·정의·포용' },
        { value: '17', label: '17. 지구촌 협력 강화' },
        { value: '18', label: '수리부엉이' },
        { value: '19', label: '뜸부기' },
        { value: '20', label: '금개구리' },
    ];


    //React Hook
    const mapRef = useRef(null);
    const selectInputRef = useRef(null);
    const [modal1, setModal1] = useState(true);
    const [modal2, setModal2] = useState(true);
    const [modal3, setModal3] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [markerCursor, setMarkerCursor] = useState(false);
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
    const [category, setCategory] = useState('');
    const [sessionEmail, setSessionEmail] = useState('');
    const [sessionNickName, setSessionNickName] = useState('');
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [sideInfo, setSideInfo] = useState(false);
    const [clickedMarker, setClickedMarker] = useState('');
    const [clickedMarker_title, setClickedMarker_title] = useState('');
    const [clickedMarker_location, setClickedMarker_location] = useState('');
    const [clickedMarker_content, setClickedMarker_content] = useState('');
    const [clickedMarker_cate1, setClickedMarker_cate1] = useState('');
    const [clickedMarker_cate2, setClickedMarker_cate2] = useState('');
    const [clickedMarker_cate3, setClickedMarker_cate3] = useState('');
    const [clickedMarker_img, setClickedMarker_img] = useState([]);
    const [clickedMarker_poster, setClickedMarker_poster] = useState([]);
    const [addSuccessModal, setAddSuccessModal] = useState(false);
    const [requireLogin, setRequireLogin] = useState(false);
    const [zoomImg, setZoomImg] = useState('');
    const [zoomImgModal, setZoomImgModal] = useState(false);
    const [detailAddress, setDetailAddress] = useState('');
    const [markerData, setMarkerData] = useState([]);
    const [markers, setMarkers] = useState([]);

    const [postMarkers, setPostMarkers] = useState([]);
    const [deletedMarker, setDeletedMarker] = useState(false);
    const [deletedAllMarker, setDeletedAllMarker] = useState(false);

    const navigate = useNavigate();


    // let markerData = [];
    // let markers = [];
    let v_clickedMarker;
    let v_clickedMarker_title;
    let v_clickedMarker_location;
    let v_clickedMarker_content;
    let v_clickedMarker_cate1;
    let v_clickedMarker_cate2;
    let v_clickedMarker_cate3;
    let v_clickedMarker_img;
    let v_clickedMarker_poster;

    const inputClickedMarker_title = (e) => {
        setClickedMarker_title(e);
    }
    const inputClickedMarker_location = (e) => {
        setClickedMarker_location(e);
    }
    const inputClickedMarker_content = (e) => {
        setClickedMarker_content(e);
    }
    const inputClickedMarker_cate1 = (e) => {
        setClickedMarker_cate1(e);
    }
    const inputClickedMarker_cate2 = (e) => {
        setClickedMarker_cate2(e);
    }
    const inputClickedMarker_cate3 = (e) => {
        setClickedMarker_cate3(e);
    }
    const inputClickedMarker_img = (e) => {
        setClickedMarker_img(e);
    }
    const inputClickedMarker_poster = (e) => {
        setClickedMarker_poster(e);
    }

    useEffect(() => {






        //마커 정보 로드
        const fetchData = async () => {
            try {
                const response = await fetch('http://182.209.228.24:8484/loadmarker');
                const positions = await response.json();
                setMarkerData(prevMarkerData => [
                    ...prevMarkerData, // 이전 배열의 요소들을 그대로 유지합니다.
                    ...positions.map(position => ({
                        title: position.markerName,
                        x: position.xCoordinate,
                        y: position.yCoordinate,
                        location: position.loca,
                        category1: position.category1,
                        category2: position.category2,
                        category3: position.category3,
                        content: position.content,
                        image: position.images,
                        id: position._id,
                        date: position.date,
                        poster: position.poster
                    }))
                ]);
            } catch (err) {
                console.log('마커 데이터 불러오다 사고남', err);
            }
        };












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
        // clickMarker.setMap(map);


        const geocoder = new kakao.maps.services.Geocoder();

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            const latlng = mouseEvent.latLng;
            setCenterX(latlng.getLat());
            setCenterY(latlng.getLng());
            //상세 주소 가져오기
            searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    // var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                    // detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

                    // var content = '<div class="bAddr">' +
                    //     '<span class="title">법정동 주소정보</span>' +
                    //     detailAddr +
                    //     '</div>';

                    clickMarker.setPosition(latlng);
                    console.log('위도 :', latlng.getLat(), '경도 :', latlng.getLng());


                    // infowindow.setContent(content);
                    // infowindow.open(map, marker);
                    console.log('주소 : ', result[0].road_address)
                    if (result[0].road_address && result[0].road_address.address_name) {
                        setDetailAddress(result[0].road_address.address_name)
                        setLoca(result[0].road_address.address_name);
                        console.log('이상하다')
                    }

                }
            })
            // clickMarker.setMap(map);

            function searchDetailAddrFromCoords(coords, callback) {
                // 좌표로 법정동 상세 주소 정보를 요청합니다
                geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
            }



        })


        //latlng.getLat() 위도 확인
        //latlng.getLng() 경도 확인

        //마커 찍은 데 또 찍으면 없애기
        kakao.maps.event.addListener(clickMarker, 'click', function (mouseEvent) {
            clickMarker.setMap(null);
        })


        mapRef.current = map;




        //커서 변경 관련
        const changebackCursorESC = (e) => {
            if (e.key === 'Escape') {
                map.setCursor('move');
                setMarkerCursor(false);
            }
        }

        document.addEventListener('keydown', changebackCursorESC);

        fetchData();
    }, [])


    const showMarker = (map) => {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map)
        }
    }



    useEffect(() => {
        const handleEffect = async () => {
            if (category === category) {
            }
            console.log('현 카테고리는 ? ', category)
            await createMarkers();
        };

        handleEffect();

    }, [category])

    useEffect(() => {
        // const container = document.getElementById('map');
        // const options = {
        //     center: new kakao.maps.LatLng(37.75907204876572, 126.7808987771656),
        //     level: 3
        // };
        // const map = new kakao.maps.Map(container, options);
        const map = mapRef.current;

        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
        for (let i = 0; i < postMarkers.length; i++) {
            postMarkers[i].setMap(null);
        }


        // //클릭해서 마커 찍기 + 마커 이미지 커스텀
        // const clickImageSrc = `${process.env.PUBLIC_URL}/marker_cursor.png`,
        //     clickImageSize = new kakao.maps.Size(50, 60),
        //     clickImageOption = { offset: new kakao.maps.Point(25, 50) }; //수치 조정으로 클릭 시 마커 위치 정밀 조정
        // const markerImage = new kakao.maps.MarkerImage(clickImageSrc, clickImageSize, clickImageOption);

        // const clickMarker = new kakao.maps.Marker({
        //     // 시작하자마자 가운데에 마커 찍기
        //     // position: map.getCenter(),

        //     image: markerImage
        // });
        // // clickMarker.setMap(map);


        // const geocoder = new kakao.maps.services.Geocoder();

        // kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        //     const latlng = mouseEvent.latLng;
        //     setCenterX(latlng.getLat());
        //     setCenterY(latlng.getLng());
        //     //상세 주소 가져오기
        //     searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        //         if (status === kakao.maps.services.Status.OK) {
        //             // var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
        //             // detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

        //             // var content = '<div class="bAddr">' +
        //             //     '<span class="title">법정동 주소정보</span>' +
        //             //     detailAddr +
        //             //     '</div>';

        //             clickMarker.setPosition(latlng);
        //             console.log('위도 :', latlng.getLat(), '경도 :', latlng.getLng());


        //             // infowindow.setContent(content);
        //             // infowindow.open(map, marker);
        //             console.log('주소 : ', result[0].road_address)
        //             if (result[0].road_address && result[0].road_address.address_name) {
        //                 setDetailAddress(result[0].road_address.address_name)
        //                 setLoca(result[0].road_address.address_name);
        //                 console.log('진짜 이상하다');
        //             }

        //         }
        //     })
        //     // clickMarker.setMap(map);

        //     function searchDetailAddrFromCoords(coords, callback) {
        //         // 좌표로 법정동 상세 주소 정보를 요청합니다
        //         geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        //     }



        // })


        // //latlng.getLat() 위도 확인
        // //latlng.getLng() 경도 확인

        // //마커 찍은 데 또 찍으면 없애기
        // kakao.maps.event.addListener(clickMarker, 'click', function (mouseEvent) {
        //     clickMarker.setMap(null);
        // })


        // mapRef.current = map;




        // //커서 변경 관련
        // const changebackCursorESC = (e) => {
        //     if (e.key === 'Escape') {
        //         map.setCursor('move');
        //         setMarkerCursor(false);
        //     }
        // }

        // document.addEventListener('keydown', changebackCursorESC);








    }, [markers])



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

    useEffect(() => {
        if (addCategory1?.value == 0) {
            onClearSelect1();
        }
    }, [addCategory1])
    useEffect(() => {
        if (addCategory2?.value == 0) {
            onClearSelect2();
        }
    }, [addCategory2])
    useEffect(() => {
        if (addCategory3?.value == 0) {
            onClearSelect3();
        }
    }, [addCategory3])


    // 각종 함수
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
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const closeModal2 = () => {
        setModal2(false);
    }

    const clickButton3 = () => {
        const noState = document.getElementById('map-modal1');
        if (noState) {
            noState.style.display = noState.style.display === 'none' ? 'block' : 'none';
        }
        setModal2(false);
        setModal3(false);



        // if (modal1 == true) {
        //     setModal1(false);
        // } else {
        //     setModal1(true);
        // }
    }

    const clickButton4 = () => {
        setModal2(false);
        if (modal3 == true) {
            setModal3(false);
        } else {
            setModal3(true);
        }
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }

    const closeSideinfo = () => {
        const noState = document.getElementById('map-sideinfo');
        if (noState) {
            noState.style.display = 'none';
        }
    }
    const handleCategoryClick = async (idx) => {
        const map = mapRef.current;

        setDeletedAllMarker(false);
        if (idx == category) {
            if (deletedMarker == false) {
                for (let i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                setDeletedMarker(true);
            } else if (deletedMarker == true) {
                for (let i = 0; i < markers.length; i++) {
                    markers[i].setMap(map);
                }
                setCategory(idx);
                setDeletedMarker(false);
            }
        } else {
            await setCategory(idx);
        }
    }
    const clickWholeBtn = async () => {
        const map = mapRef.current;

        if (deletedAllMarker == false) {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
            setCategory(0);
            setDeletedAllMarker(true);
        } else if (deletedAllMarker == true) {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            setDeletedAllMarker(false);
        }
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

    const goToHome = () => {
        navigate('/')
    }

    const allOff = () => {
        setModal2(false);
        setModal3(false);
        setAddModal(false);
        setSideInfo(false);
        setImage([]);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
        if (markerCursor) {
            popupAdd();
            setMarkerCursor(false);
            const map = mapRef.current;
            map.setCursor('move');
        }
    }

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const changebackCursor = () => {
        setMarkerCursor('dafault');
    }
    const changeCursor = () => {
        const map = mapRef.current;
        if (markerCursor) {
            map.setCursor('move');
            setMarkerCursor(false);
        } else {
            map.setCursor(`url(${process.env.PUBLIC_URL}/marker_cursor.png) 25 55, default`);
            setMarkerCursor(true);
        }
        console.log('커서변경클릭')

    }
    const rightClick = () => {
        if (markerCursor) {
            setMarkerCursor(false);
            const map = mapRef.current;
            map.setCursor('move');
        }
    }
    const onClearSelect1 = () => {
        setAddCategory1(null);
    }
    const onClearSelect2 = () => {
        setAddCategory2(null);
    }
    const onClearSelect3 = () => {
        setAddCategory3(null);
    }
    const ClickRequireLoginEnter = () => {
        setRequireLogin(false);
        navigate('/login_m');
    }
    const clearImageFile = () => {
        setImage([]);
    }
    const handleZoom = (num) => {
        setZoomImg(num);
        setZoomImgModal(true);
        console.log('줌이미지', num)
    }





    const createMarkers = () => {
        const map = mapRef.current;

        setPostMarkers(markers);
        setMarkers([]);
        if (category === 0) {
            for (let i = 0; i < markerData.length; i++) {
                const imageSize = new kakao.maps.Size(25, 25);
                const imageSrc = `${process.env.PUBLIC_URL}/${markerData[i].category1}.png`;
                const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(markerData[i].x, markerData[i].y),
                    title: markerData[i].title,
                    image: markerImage,
                    //임의 추가
                    location: markerData[i].location,
                    content: markerData[i].content,
                    category1: markerData[i].category1,
                    category2: markerData[i].category2,
                    category3: markerData[i].category3,
                    clickable: true
                })
                marker.setMap(null);
                setMarkers((prevArray) => [...prevArray, marker]);
                //마커 클릭 시 윈도우 펼쳐지기 위해 넣은 코드. 카테고리별 로드에 문제 없는지 추후 확인하기
                (function (marker) {
                    kakao.maps.event.addListener(marker, 'click', function () {
                        console.log('클릭!', marker)
                        v_clickedMarker = i;
                        v_clickedMarker_title = markerData[i].title;
                        v_clickedMarker_location = markerData[i].location;
                        v_clickedMarker_content = markerData[i].content;
                        v_clickedMarker_cate1 = markerData[i].category1;
                        v_clickedMarker_cate2 = markerData[i].category2;
                        v_clickedMarker_cate3 = markerData[i].category3;
                        v_clickedMarker_img = markerData[i].image;
                        v_clickedMarker_poster = markerData[i].poster;

                        inputClickedMarker_title(v_clickedMarker_title);
                        inputClickedMarker_location(v_clickedMarker_location);
                        inputClickedMarker_content(v_clickedMarker_content);
                        inputClickedMarker_cate1(v_clickedMarker_cate1);
                        inputClickedMarker_cate2(v_clickedMarker_cate2);
                        inputClickedMarker_cate3(v_clickedMarker_cate3);
                        inputClickedMarker_img(v_clickedMarker_img);
                        inputClickedMarker_poster(v_clickedMarker_poster);


                        const noState = document.getElementById('map-sideinfo');
                        if (noState) {
                            if (noState.style.display === 'none') {
                                noState.style.display = 'block';
                            }
                        }
                    })
                })(marker);

            }

            console.log('마커스 배열 정보 : ', markers)

            showMarker(map);

        }
        else {
            for (let i = 0; i < markerData.length; i++) {
                // console.log('for문까지만 진입', category)
                if (category == markerData[i].category1) {
                    // console.log('카테고리가 0이 아니고 for문 안 if문까지 진입')
                    const imageSize = new kakao.maps.Size(25, 25);
                    const imageSrc = `${process.env.PUBLIC_URL}/${markerData[i].category1}.png`;
                    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: new kakao.maps.LatLng(markerData[i].x, markerData[i].y),
                        title: markerData[i].title,
                        image: markerImage,
                        clickable: true
                    })
                    marker.setMap(null);
                    setMarkers((prevArray) => [...prevArray, marker]);
                    //마커 클릭 시 윈도우 펼쳐지기 위해 넣은 코드. 카테고리별 로드에 문제 없는지 추후 확인하기
                    (function (marker) {
                        kakao.maps.event.addListener(marker, 'click', function () {
                            console.log('클릭!', marker)
                            v_clickedMarker = i;
                            v_clickedMarker_title = markerData[i].title;
                            v_clickedMarker_location = markerData[i].location;
                            v_clickedMarker_content = markerData[i].content;
                            v_clickedMarker_cate1 = markerData[i].category1;
                            v_clickedMarker_cate2 = markerData[i].category2;
                            v_clickedMarker_cate3 = markerData[i].category3;
                            v_clickedMarker_img = markerData[i].image;
                            v_clickedMarker_poster = markerData[i].poster;

                            inputClickedMarker_title(v_clickedMarker_title);
                            inputClickedMarker_location(v_clickedMarker_location);
                            inputClickedMarker_content(v_clickedMarker_content);
                            inputClickedMarker_cate1(v_clickedMarker_cate1);
                            inputClickedMarker_cate2(v_clickedMarker_cate2);
                            inputClickedMarker_cate3(v_clickedMarker_cate3);
                            inputClickedMarker_img(v_clickedMarker_img);
                            inputClickedMarker_poster(v_clickedMarker_poster);
                            console.log('클릭드마커 : ', clickedMarker_title);


                            const noState = document.getElementById('map-sideinfo');
                            if (noState) {
                                if (noState.style.display === 'none') {
                                    noState.style.display = 'block';
                                }
                            }
                        })
                    })(marker);
                }
            }

            showMarker(map);

        }
    }










    //행정동 이동 관련 함수
    const go1 = () => {
        setCurrentLocation('문산읍');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.8567429, 126.790438);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go2 = () => {
        setCurrentLocation('조리읍');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.744742, 126.8051987);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go3 = () => {
        setCurrentLocation('법원읍');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.849062, 126.882353);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go4 = () => {
        setCurrentLocation('파주읍');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.832687, 126.819152);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go5 = () => {
        setCurrentLocation('광탄면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7760902, 126.8516426);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go6 = () => {
        setCurrentLocation('탄현면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.8024426, 126.716178);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go7 = () => {
        setCurrentLocation('월롱면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.799368, 126.789774);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go8 = () => {
        setCurrentLocation('적성면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.954208, 126.917881);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go9 = () => {
        setCurrentLocation('파평면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.921439, 126.8379569);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go10 = () => {
        setCurrentLocation('군내면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.9319458, 126.7283000);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go11 = () => {
        setCurrentLocation('장단면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.9062269, 126.7310796);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go12 = () => {
        setCurrentLocation('진동면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.940431, 126.799860);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go13 = () => {
        setCurrentLocation('진서면');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.9514586, 126.7134711);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go14 = () => {
        setCurrentLocation('교하동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.752483, 126.746941);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go15 = () => {
        setCurrentLocation('운정1동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.724233, 126.7512977);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go16 = () => {
        setCurrentLocation('운정2동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7239199, 126.7515154);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go17 = () => {
        setCurrentLocation('운정3동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7168025, 126.7433708);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go18 = () => {
        setCurrentLocation('운정4동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7191693, 126.7685742);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go19 = () => {
        setCurrentLocation('운정5동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7202108, 126.7108133);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go20 = () => {
        setCurrentLocation('운정6동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7199121, 126.7224236);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go21 = () => {
        setCurrentLocation('금촌1동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7663105, 126.775981);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go22 = () => {
        setCurrentLocation('금촌2동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7517308, 126.7774006);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }
    const go23 = () => {
        setCurrentLocation('금촌3동');
        const map = mapRef.current;
        const moveLatLon = new kakao.maps.LatLng(37.7712163, 126.778153);
        map.setCenter(moveLatLon);
        setModal3(false);
        const noState = document.getElementById('map-modal1');
        if (noState) {
            if (noState.style.display === 'block') {
                noState.style.display = 'none';
            }
        }
    }



    //등록 관련
    const clickAddBT = async () => {
        // const rrs = await fetch('http://182.209.228.24:8484/user', {
        //     method: 'GET',
        //     credentials: 'include'
        // })
        //     .then(rrs => rrs.json())
        //     .then(data => {
        //         if (!data.user || typeof data.user.nickName === 'undefined') {
        //             console.log("???")
        //             navigate('/login')
        //         } else if (centerX) {
        //             setAddModal(true);
        //             setSessionEmail(data.user.email);
        //             setSessionNickName(data.user.nickName);
        //         } else {
        //             alert('좌표를 먼저 찍어 주세요');
        //         }
        //     })
        changeCursor();

    }
    const popupAdd = async () => {
        const rrs = await fetch('http://182.209.228.24:8484/user', {
            method: 'GET',
            credentials: 'include'
        })
            .then(rrs => rrs.json())
            .then(data => {
                if (!data.user || typeof data.user.nickName === 'undefined') {
                    console.log("???")
                    setRequireLogin(true);
                    // navigate('/login')
                } else if (centerX) {
                    setLoca(detailAddress);
                    console.log('디테일어드레스 : ', detailAddress);
                    setAddModal(true);
                    setSessionEmail(data.user.email);
                    setSessionNickName(data.user.nickName);
                } else {
                    alert('좌표를 먼저 찍어 주세요');
                }
            })
    }
    const closeAddBT = () => {
        setAddModal(false);
        setDetailAddress('');
        setImage([]);
        setAddCategory1('');
        setAddCategory2('');
        setAddCategory3('');

    }
    const handleImageChange = (e) => {
        e.preventDefault();
        if (image.length < 4) {
            const reader = new FileReader();
            const file = e.target.files[0];
            reader.onloadend = () => {
                setImage([...image, file]);
            };
            reader.readAsDataURL(file);
            e.target.value = "";
        } else {
            alert('최대 4장까지 업로드 가능합니다.')
        }
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
                console.log('셋포스터 : ', sessionNickName)
            })
        if (!name) {
            alert('등록할 장소의 이름을 입력해 주세요.')
        } else if (!loca) {
            alert('등록할 장소의 위치를 입력해 주세요.')
        } else if (!addCategory1) {
            alert('등록할 장소와 관련된 대표 SDGs를 선택해 주세요.')
            // } else if (!addCategory2) {
            //     alert('등록할 장소와 관련된 SDGs를 선택해 주세요.')
            // } else if (!addCategory3) {
            //     alert('등록할 장소와 관련된 SDGs를 선택해 주세요.')
        } else if (addCategory1.value === addCategory2?.value) {
            alert('카테고리가 겹치지 않게 선택해 주세요.')
        } else if (addCategory2 && addCategory2?.value === addCategory3?.value) {
            alert('카테고리가 겹치지 않게 선택해 주세요.')
        } else if (addCategory1.value === addCategory3?.value) {
            alert('카테고리가 겹치지 않게 선택해 주세요.')
        } else if (!content) {
            alert('등록할 장소의 내용을 입력해 주세요.')
        } else {
            try {
                console.log('현재 포스터 : ', poster)
                const formData = new FormData();
                formData.append('name', name);
                formData.append('loca', loca);
                formData.append('content', content);
                formData.append('category1', addCategory1?.value);
                formData.append('category2', addCategory2?.value);
                formData.append('category3', addCategory3?.value);
                formData.append('xCoordinate', centerX);
                formData.append('yCoordinate', centerY);
                formData.append('poster', sessionNickName)
                image.forEach((image) => {
                    formData.append('image', image);
                });

                const response = await fetch('http://182.209.228.24:8484/addmarker', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                console.log(data);
                if (data.success == true) {
                    setAddModal(false);
                    setAddSuccessModal(true);
                }
            } catch (error) {
                console.error(error);
            }
        }

    };

    const reloadPage = () => {
        setAddSuccessModal(false);
        window.location.reload();
    }


    //좋아요 / 싫어요 관련



    return (
        <div style={{ position: "relative" }}>
            <div className='map' id='map' onClick={allOff} onContextMenu={rightClick}>


            </div>

            <div className='map-1'>
                <div className='map-btnbar'>
                    <div className='map-btn1'>
                        <span>파주시 지속가능발전목표(SDGs) 지도</span>
                    </div>

                    <input className='map-btn2' type='text' placeholder='파주시 내 주소나 명칭을 검색하세요' onChange={searchLocation} />
                    <div className='map-btn3' onClick={clickButton3}>
                        <span>SDGs</span>
                    </div>
                    <div className='map-btn4'>
                        <span className='map-btn4-black' style={{ fontSize: '14px' }}>경기도</span>
                        <span className='map-btn4-gray'>&gt;</span>
                        <span className='map-btn4-black' style={{ fontSize: '14px' }}>파주시</span>
                        <span className='map-btn4-gray'>&gt;</span>
                        <span className='map-btn4-black' style={{ width: '40px' }}></span>
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
                <div className='map-add-btn' onClick={clickAddBT}><img src={`${process.env.PUBLIC_URL}/marker_add.png`} /></div>
                <div id='map-modal1' className='map-modal1' style={{ display: "none" }}>
                    <ul>
                        {[...Array(20)].map((_, index) => (
                            <React.Fragment key={index + 1}>
                                <li
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleCategoryClick(index + 1)}>
                                    <img src={`${process.env.PUBLIC_URL}/${index + 1}.png`} alt={`Category ${index + 1}`} />
                                    <div className='map-modal1-index'>{hoveredIndex === index && <p>{modal2_line[index]}</p>}</div>
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                    <button className='map-modal1-btn' onClick={clickWholeBtn}>전체</button>
                </div>
                {modal2 ? (
                    <div className='map-modal2'>
                        <div className='map-modal2-1'>
                            <div className='map-modal2-top'>
                                파주시 지속가능발전목표(SDGs)지도
                            </div>
                            <div className='map-modal2-header'><span>UN-SDGs 17개 목표 및 파주시 깃대종</span></div>
                            <ul>
                                {[...Array(20)].map((_, index) => (
                                    <li key={index + 1} >
                                        <img src={`${process.env.PUBLIC_URL}/1-${index + 1}.png`} alt={`img ${index + 1}`} />
                                        {index <= 16 ? (<p>{index + 1}.</p>) : null}
                                        <span>{modal2_line[index]}</span>
                                    </li>
                                ))}
                            </ul>
                            <img className='map-footer' src={`${process.env.PUBLIC_URL}/map-footer.png`} />
                        </div>
                        <button className='map-modal2-close' onClick={closeModal2}><div className='map-modal2-triangle' /></button>
                    </div>
                ) : (
                    <button className='map-modal2-open' onClick={openModal2}><div className='map-modal2-triangle-1' /></button>
                )}
                <div className='map-goToHome' onClick={goToHome}><img src={`${process.env.PUBLIC_URL}/goToHome.png`} /></div>


                {addModal && (
                    <div className='map-add-modal'>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "25px" }}>
                            <h1 style={{ fontSize: "25px" }}>신규 등록 제안</h1>
                            <div style={{ width: "20px", height: "20px", backgroundColor: "black", color: "white", textAlign: "center", marginLeft: "350px", marginTop: "-15px", position: "absolute", cursor: "pointer" }}
                                onClick={closeAddBT}>X</div>
                        </div>
                        <p className='map-add-modal-p1'>지속가능발전목표와 관련 있는 장소와 등록을 제안할 수 있습니다.</p>

                        <div className='map-add-imgbtn-1'>
                            <p style={{ fontSize: "12px", marginTop: "-70px" }}>해당 장소를 확인할 수 있는 사진을 첨부해 주시면 등록이 빨라집니다.</p>
                            <div style={{ width: "30px", height: "15px", fontSize: "10px", position: "absolute", marginTop: "-70px", marginLeft: "430px", border: "1px solid black", textAlign: "center" }} onClick={clearImageFile}>삭제</div>

                            <div className='map-add-imgbtn1'>
                                {image.length > 0 ?
                                    <h3>({image[0].name})</h3>
                                    : (
                                        <>
                                            <p>+사진 추가 1</p>
                                        </>
                                    )}
                            </div>
                            <input className='map-add-imgbtn' type="file" name="images" accept="image/*" onChange={handleImageChange} style={{ marginLeft: "-240px", marginTop: "-20px" }} />

                            <div className='map-add-imgbtn2'>
                                {image.length > 1 ?
                                    <h3>({image[1].name})</h3>
                                    : (
                                        <>
                                            <p>+사진 추가 2</p>
                                        </>
                                    )}
                            </div>
                            <input className='map-add-imgbtn' type="file" name="images" accept="image/*" onChange={handleImageChange} style={{ marginLeft: "240px", marginTop: "-20px" }} />

                            <div className='map-add-imgbtn3'>
                                {image.length > 2 ?
                                    <h3>({image[2].name})</h3>
                                    : (
                                        <>
                                            <p>+사진 추가 3</p>
                                        </>
                                    )}
                            </div>
                            <input className='map-add-imgbtn' type="file" name="images" accept="image/*" onChange={handleImageChange} style={{ marginLeft: "-240px", marginTop: "50px" }} />

                            <div className='map-add-imgbtn4'>
                                {image.length > 3 ?
                                    <h3>({image[3].name})</h3>
                                    : (
                                        <>
                                            <p>+사진 추가 4</p>
                                        </>
                                    )}
                            </div>
                            <input className='map-add-imgbtn' type="file" name="images" accept="image/*" onChange={handleImageChange} style={{ marginLeft: "240px", marginTop: "50px" }} />

                        </div>
                        <p style={{ marginLeft: "-350px", marginTop: "30px" }}>등록할 장소의 이름</p>
                        <input className='map-add-name' onChange={handleNameChange} type="text" name="map-add-name" style={{ paddingLeft: "10px", marginTop: "10px", width: "470px", height: "35px" }} />
                        <p style={{ marginLeft: "-195px", marginTop: "10px", display: "flex", alignItems: "center" }}>위치
                            <p style={{ fontSize: "12px", marginLeft: "5px" }}>(정확한 위치를 입력하려면 화살표를 눌러 주세요)</p></p>
                        <input className='map-add-loca' onChange={handleLocaChange} type="text" name="map-add-loca" readOnly value={detailAddress} style={{ paddingLeft: "10px", width: "470px", height: "35px", marginTop: "10px" }} />
                        <div className='map-location-arrow'>&gt;</div>
                        <p style={{ marginLeft: "-270px", marginTop: "10px", display: "flex", alignItems: "center" }}>관련 SDGs
                            <p style={{ fontSize: "12px", marginLeft: "5px" }}>(1~3개를 선택해 주세요)</p></p>
                        <div className='map-add-cate-option'>
                            <Select ref={selectInputRef} className='map-add-cate1' options={categoryOption} onChange={handleCategoryChange1} value={addCategory1} placeholder="필수">추가</Select>
                            <Select ref={selectInputRef} className='map-add-cate2' options={categoryOption} onChange={handleCategoryChange2} value={addCategory2} placeholder="선택">추가</Select>
                            <Select ref={selectInputRef} className='map-add-cate3' options={categoryOption} onChange={handleCategoryChange3} value={addCategory3} placeholder="선택">추가</Select>
                        </div>
                        <p style={{ marginLeft: "-250px", marginTop: "20px", display: "flex", alignItems: "center" }}>내용
                            <p style={{ fontSize: "12px", marginLeft: "5px" }}>(등록하고 싶은 이유 등을 적어 주세요.)</p></p>
                        <textarea className='map-add-content' onChange={handleContentChange} type="text" name="map-add-content" style={{ paddingLeft: "10px", width: "470px", height: "90px", marginTop: "10px", paddingTop: "10px" }} />
                        <div style={{
                            display: "flex", width: "300px", height: "25px", position: "absolute"
                            , marginTop: "570px", marginLeft: "-180px"
                        }}>
                            <p className='map-add-modal-name' style={{}}>등록 제안 회원 :</p>
                            <p style={{ marginLeft: "10px" }}>{sessionNickName}</p>
                        </div>
                        <div style={{
                            display: "flex", width: "300px", height: "25px", position: "absolute"
                            , marginTop: "590px", marginLeft: "-180px"
                        }}>
                            <p className='map-add-modal-name' style={{}}>결과 받을 이메일 :</p>
                            <p style={{ marginLeft: "10px" }}>{sessionEmail}</p>
                        </div>
                        <div className='map-add-addbtn' onClick={handleSubmit}>확인</div>
                        <p style={{ marginTop: "10px", fontWeight: "bold", fontSize: "13px" }}>확인 버튼을 누르면 등록 제안이 파주시지속가능발전협의회로 전송됩니다.</p>
                        <p style={{ marginTop: "5px", fontWeight: "bold", fontSize: "13px" }}>제안한 내용이 신규 등록되면 레벨 점수 20점을 드립니다. 감사합니다.</p>
                    </div>
                )}

                <div id='map-sideinfo' className='map-sideinfo' style={{ display: "none" }}>
                    <div className='map-modal2'>
                        <div className='map-modal2-1'>
                            <div className='map-modal2-top'>
                                파주시 지속가능발전목표(SDGs)지도
                            </div>
                            <div className='map-sideinfo-div1'>
                                <div className='map-sideinfo-div1-left'>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <h1 style={{ fontSize: "20px" }}>{clickedMarker_title}</h1>
                                        <p style={{ fontSize: "14px", marginTop: "5px" }}>
                                            {clickedMarker_location}</p>
                                    </div>
                                    <div className='map-sideinfo-div1-img'>
                                        {/* 이미지 3개 */}
                                        <img src={`${process.env.PUBLIC_URL}/${clickedMarker_cate1}.png`} alt={`Category ${clickedMarker_cate1}`} />
                                        {clickedMarker_cate2 != 'undefined' && (<img src={`${process.env.PUBLIC_URL}/${clickedMarker_cate2}.png`} alt={`Category ${clickedMarker_cate2}`} />)}
                                        {clickedMarker_cate3 != 'undefined' && (<img src={`${process.env.PUBLIC_URL}/${clickedMarker_cate3}.png`} alt={`Category ${clickedMarker_cate3}`} />)}
                                    </div>

                                    <img src={`http://182.209.228.24:8484/uploads/${[clickedMarker_img[0]]}`} style={{ width: "65px", height: "45px", cursor: "pointer" }} onClick={() => handleZoom(0)} />
                                    {clickedMarker_img[1] && <img src={`http://182.209.228.24:8484/uploads/${[clickedMarker_img[1]]}`} style={{ width: "65px", height: "45px", marginLeft: "5px", cursor: "pointer" }} onClick={() => handleZoom(1)} />}
                                    {clickedMarker_img[2] && <img src={`http://182.209.228.24:8484/uploads/${[clickedMarker_img[2]]}`} style={{ width: "65px", height: "45px", marginLeft: "5px", cursor: "pointer" }} onClick={() => handleZoom(2)} />}
                                    {clickedMarker_img[3] && <img src={`http://182.209.228.24:8484/uploads/${[clickedMarker_img[3]]}`} style={{ width: "65px", height: "45px", marginLeft: "5px", cursor: "pointer" }} onClick={() => handleZoom(3)} />}

                                    <p style={{ fontSize: "14px", marginTop: "5px" }}>{clickedMarker_content}</p>
                                    <p style={{ fontSize: "14px", marginTop: "5px" }}>({clickedMarker_poster} 님)</p>

                                    <div style={{ display: "flex", marginLeft: "205px", marginTop: "12px" }}>
                                        <div className='map-sideinfo-like'>
                                            <img src={`${process.env.PUBLIC_URL}/like.png`} />
                                            <p>17</p>
                                        </div>
                                        <div className='map-sideinfo-hate'>
                                            <img src={`${process.env.PUBLIC_URL}/hate.png`} />
                                            <p>2</p>
                                        </div>
                                    </div>


                                </div>

                            </div>



                            <img className='map-footer' src={`${process.env.PUBLIC_URL}/map-footer.png`} />
                        </div>
                        <button className='map-modal2-close' onClick={closeSideinfo}><div className='map-modal2-triangle' /></button>
                    </div>




                </div>


            </div>


            {addSuccessModal && (
                <div className='map-addSuccessModal'>
                    <h1>시민과 함께 만드는 파주시 지속가능발전목표 지도</h1>
                    <h2>회원님의 등록 제안이 접수되었습니다.</h2>
                    <h2>확인 후 등록 여부는 회원님의 이메일로 알려드리겠습니다.</h2>
                    <h2>감사합니다.</h2>
                    <div className='map-modal-enter' onClick={reloadPage}>확인</div>
                </div>
            )}
            {requireLogin && (
                <div className='map-requireLoginModal'>
                    <h1>로그인이 필요합니다.</h1>
                    <div className='map-modal-enter' onClick={ClickRequireLoginEnter}>확인</div>
                </div>
            )}
            {zoomImgModal && (
                <div className='map-zoomImg'>
                    <div onClick={() => setZoomImgModal(false)} style={{ position: "absolute", marginRight: "5px", marginTop: "5px", right: "0", border: "1px solid black", cursor: "pointer", backgroundColor: "white" }}>닫기</div>
                    <img src={`http://182.209.228.24:8484/uploads/${[clickedMarker_img[zoomImg]]}`} style={{ width: "500px" }} />
                </div>

            )}



        </div>
    )
}

export default Map