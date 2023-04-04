import React from 'react'
import IntroSide from '../component/IntroSide'
import TopBar from '../component/TopBar'
import UnderBar from '../component/UnderBar'

const History = () => {
    return (
        <div className="wrap">
            <TopBar />
            <div className="main-back">
                <div className="empty1200">
                    <IntroSide />
                </div>
            </div>
            <UnderBar />
        </div>
    )
}

export default History