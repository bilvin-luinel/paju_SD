import React from 'react'

const NewsCard = (props) => {

    //340px * 340px
    //이미지 340px * 200px
    //글씨 340px * 140px

  return (
    <div className='news-card'>
        <img className='news-card-img' src={props.imgSrc} onError={(e) => {
          e.target.onerror = null; // to avoid infinite fallback loop
          e.target.src = `${process.env.PUBLIC_URL}/emblem.png`; // fallback image
        }}/>
        <div className='news-card-text'>
            <h2 className='news-card-headline'>{props.headline}</h2>
            <h2 className='news-card-content'>{props.content1}</h2>
        </div>
    </div>
  )
}

export default NewsCard