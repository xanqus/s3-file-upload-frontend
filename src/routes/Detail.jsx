import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await axios({
        method: 'GET',
        url: `http://localhost:8089/article/${id}`,
      });
      setArticle(data.data);
      setLoading(false);
      console.log(data.data);
    };
    getData();
  }, []);
  if (loading) return <div>loading...</div>;
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

      <Viewer initialValue={article?.body} />
      <div className='flex w-full mt-4'>
        {article.imageList.map((image, index) => {
          return (
            <div key={index} className='w-36'>
              <img src={image.imgUrl} alt='article image' />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
