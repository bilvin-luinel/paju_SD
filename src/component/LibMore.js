import React from 'react'

const LibMore = () => {
    return (
        <div>
            <div className="more-div" style={{ width: "140px", height: "240px", marginTop: "5px"}}>
                <a href="#"><div className="more-point" /><div className="more-text">공지사항</div></a>
                <a href="/news-list"><div className="more-point" /><div className="more-text">뉴스</div></a>
                <a href="#"><div className="more-point" /><div className="more-text">일정표</div></a>
                <a href="#"><div className="more-point" /><div className="more-text">지속가능발전 지도</div></a>
                <a href="#"><div className="more-point" /><div className="more-text">자료실</div></a>
                <a href="#"><div className="more-text-1">문서자료</div></a>
                <a href="#"><div className="more-text-1">사진자료</div></a>
                <a href="#"><div className="more-text-1">영상자료</div></a>
                <a href="#"><div className="more-text-1">보도자료</div></a>
            </div>
        </div>
    )
}

export default LibMore