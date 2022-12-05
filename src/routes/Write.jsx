import React from 'react';

const Write = () => {
  return (
    <div className='flex flex-col max-w-5xl m-auto'>
      <div className='mt-12'>글 작성 페이지입니다.</div>
      <div className='form-control w-full mt-8'>
        <label className='label'>
          <span className='label-text'>제목을 입력해주세요</span>
        </label>
        <input
          type='text'
          placeholder='제목을 입력해주세요.'
          className='input input-bordered w-full h-20'
        />
      </div>
      <div className='form-control w-full mt-6'>
        <label className='label'>
          <span className='label-text'>내용을 입력해주세요</span>
        </label>
        <textarea
          type='text'
          placeholder='내용을 입력해주세요.'
          className='input input-bordered w-full h-96'
        />
      </div>
      <button className='btn btn-outline btn-info ml-auto mr-0 mt-4 w-24'>
        완료
      </button>
    </div>
  );
};

export default Write;
