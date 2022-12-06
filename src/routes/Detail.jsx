import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
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

      <div className='ml-auto mr-0 mt-4'>작성 일시</div>
      <div className='form-control w-full mt-8'>제목</div>
      <div className='form-control w-full mt-6'>내용</div>
    </div>
  );
};

export default Detail;
