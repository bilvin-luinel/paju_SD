import React from 'react'

const SDMore = () => {
    return (
        <div>
            <div className="more-div" style={{ width: "250px", height: "185px", marginTop: "-15px"}}>
                <a href="#"><div className="more-point" /><div className="more-text">SDGs이란?</div></a>
                <a href="#"><div className="more-point" /><div className="more-text">UN-SDGs</div></a>
                <a href="#"><div className="more-point" /><div className="more-text">K-SDGs</div></a>
                <a href="#"><div className="more-point" /><div className="more-text">경기도 SDGs</div></a>
                <a href="#"><div className="more-point" /><div className="more-text">파주시 SDGs</div></a>
                <div className="horizon-line" style={{ marginTop: "10px", marginBottom: "10px"}} />
                <a href="#"><div className="more-point" /><div className="more-text">지표 모니터링</div></a>    
            </div>
        </div>
    )
}

export default SDMore