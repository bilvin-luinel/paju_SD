import React, { useEffect, useState } from 'react';
import TopBar from '../component/TopBar'
import UnderBar from '../component/UnderBar'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const News = () => {

  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`http://182.209.228.24:8484/posts/${id}`);
      setPost(res.data);
      console.log("??? = " + post.images)
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    const img = new Image();
    img.src = `${process.env.PUBLIC_URL}/uploads/${post.images}`;
    img.onload = () => {
      setPost(prevPost => ({ ...prevPost, images: img.src }));
    };
  }, [post]);



  const navigate = useNavigate();
  const goToNewsList = () => {
    navigate('/news-list');
  }

  //날짜 변환 처리
  const date = new Date(post.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;


  // const isThereImg = () => {
  //   if (post.images == undefined) {
  //     return;
  //   } else {
  //     return <img src={`http://182.209.228.24:8484/uploads/${post.images}`} />
  //   }
  // }


  return (
    <div className="wrap">
      <TopBar />
      <h1 className='view-news-head'>뉴스</h1>
      <div className='view-news-info'>
        <p>{formattedDate}</p>
        <button className='go-to-news-list-btn' onClick={goToNewsList}>목록</button>
      </div>
      <div className='view-news-body'>
        {post ? (
          <>
            <h2>{post.title}</h2>
            {/* {isThereImg} */}
            <img src={`http://182.209.228.24:8484/uploads/${post.images}`} />
            <p>{post.content}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <UnderBar />
    </div>
  )
}

export default News