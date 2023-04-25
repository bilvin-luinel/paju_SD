import React from 'react'

const UnderBar = () => {
    {/* <p style={{ color: "#424242", fontSize: "14px", marginBottom: "10px" }}>파주시지속가능발전협의회</p>

                    <div>
                        <p>10932 경기도 파주시 시민회관길 33 소공연장 2층</p>
                        <div className="vertical-line" />
                        <p className="underbar-bold">TEL</p>
                        <p>031-944-2166</p>
                        <div className="vertical-line" />
                        <p className="underbar-bold">FAX</p>
                        <p>031-944-2156</p>
                        <div className="vertical-line" />
                        <p className="underbar-bold">EMAIL</p>
                        <p>pajuag21@pajuag21.com</p>
                    </div>
                    <p style={{ color: "#75777B", fontSize: "14px", marginTop: "10px" }}>Copyright © 푸른파주21 All Rights Reserved<a href="#" style={{marginLeft: "10px"}}>운영정책</a></p> */}
    return (
        <div>
            <div className='under-link-wrap'>
                <img className="under-link" src={`${process.env.PUBLIC_URL}/under-link.png`} />
            </div>
            <div className="footer-wrap">
                <img className='footer' src={`${process.env.PUBLIC_URL}/footer.png`} />
            </div>
        </div>
    )
}

export default UnderBar