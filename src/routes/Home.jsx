import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleList from '../components/ArticleList';

const Home = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await axios({
        method: 'GET',
        url: 'http://localhost:8089/article',
      });
      setArticles(data.data);
    };
    getData();
  }, []);

  return (
    <div className='flex flex-col max-w-5xl m-auto'>
      <button
        className='btn btn-outline btn-info ml-auto mr-0 mt-10'
        onClick={() => {
          navigate('/write');
        }}
      >
        글 작성
      </button>
      <ArticleList articles={articles} setArticles={setArticles} />
    </div>
  );
};

export default Home;
