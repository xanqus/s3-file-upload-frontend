import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState({});
  console.log(id);
  useEffect(() => {
    const getData = async () => {
      const data = await axios({
        method: 'GET',
        url: `http://localhost:8089/article/${id}`,
      });
      setArticle(data.data);
    };
    getData();
  }, []);
  return (
    <div className='flex flex-col max-w-5xl m-auto'>
      <button
        className='btn btn-outline btn-info ml-auto mr-0 mt-4 w-24'
        onClick={() => {
          navigate('/');
        }}
      >
        메인으로
      </button>

      <div className='ml-auto mr-0 mt-4'>{article?.createDate}</div>
      <div className='form-control w-full mt-8'>{article?.title}</div>
      <div className='form-control w-full mt-6'>{article?.body}</div>
    </div>
  );
};

export default Detail;
