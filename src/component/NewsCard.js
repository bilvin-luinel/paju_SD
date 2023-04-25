import React from 'react'

const NewsCard = (props) => {

    //340px * 340px
    //이미지 340px * 200px
    //글씨 340px * 140px

  return (
    <div className='news-card'>
        <img className='news-card-img' src={props.imgSrc} />
        <div className='news-card-text'>
            <h2 className='news-card-headline'>{props.headline}</h2>
            <h2 className='news-card-content'>{props.content1}</h2>
            <h2 className='news-card-content2'>{props.content2}</h2>
        </div>
    </div>
  )
}

export default NewsCard