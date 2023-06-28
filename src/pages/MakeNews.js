import React from 'react'
import Write from '../component/Write'
import TopBar from '../component/TopBar'
import UnderBar from '../component/UnderBar'

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