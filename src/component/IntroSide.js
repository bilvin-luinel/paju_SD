import React from 'react'

const IntroSide = () => {
    return (
        <div>
            {/* 연혁 조직도 분과소개 인사말 TF팀소개 */}
            <div className="side-menu">
                <p>소개</p>
                <div className="horizon-line"></div>
                <a href="/history">연혁</a>
                <div className="horizon-line"></div>
                <a href="/none">조직도</a>
                <div className="horizon-line"></div>
                <a href="/none">분과 소개</a>
                <a href="/none"><div className="more-point" style={{ marginLeft: "20px", backgroundColor: "black" }} /><div className="side-text">자연생태보전분과</div></a>
                <a href="/none"><div className="more-point" style={{ marginLeft: "20px", backgroundColor: "black" }} /><div className="side-text">도시생활환경분과</div></a>
                <a href="/none"><div className="more-point" style={{ marginLeft: "20px", backgroundColor: "black" }} /><div className="side-text">교육여성분과</div></a>
                <div className="horizon-line"></div>
                <a href="/none">인사말</a>
                <a href="/none"><div className="more-point" style={{ marginLeft: "20px", backgroundColor: "black" }} /><div className="side-text">파주시장</div></a>
                <a href="/none"><div className="more-point" style={{ marginLeft: "20px", backgroundColor: "black" }} /><div className="side-text">상임회장</div></a>
                <div className="horizon-line"></div>
                <a href="/none">TF팀 소개</a>
            </div>
        </div>
    )
}

export default IntroSide