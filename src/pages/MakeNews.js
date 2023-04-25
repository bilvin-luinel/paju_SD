import React from 'react'
import TopBar from '../component/TopBar'
import UnderBar from '../component/UnderBar'
import Write from '../component/Write'

const MakeNews = () => {
  return (
    <div className="wrap">
        <TopBar />
        <Write />
        <UnderBar />
    </div>
  )
}

export default MakeNews