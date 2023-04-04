import React from 'react'
import TopBar from '../component/TopBar'
import UnderBar from '../component/UnderBar'

const None = () => {
  return (
    <div>
        <TopBar />
        <div className="main-back">
            <div className="empty1200">
                <div className="none">
                    <p>준비 중입니다.</p>
                </div>
                
            </div>
        </div>
        <UnderBar />
    </div>
  )
}

export default None