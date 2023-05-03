import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewsList = () => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const goToMakeNews = () => {
    navigate('/make-news');
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://localhost:8484/posts');
      setPosts(res.data);
      console.log(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="wrap">
      <div className="news-list-wrap">
        <h1>뉴스<button onClick={goToMakeNews}>글쓰기</button></h1>
        {posts.map((post) => {
          return (
            <div className="news-list-div" key={post._id}>
              {post.is_notice && <span style={{marginRight:"10px"}}>[공지]</span>}
              <a href={`/news/${post._id}`}>{post.title}</a>
              <p>{new Date(post.date).toLocaleDateString()}</p>
            </div>
          );
        })}
      </div>

    </div>
  )
}

export default NewsList