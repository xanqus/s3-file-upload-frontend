import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';

const Write = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const formData = new FormData();
  const toastRef = useRef();
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
      <div className='mt-12'>글 작성 페이지입니다.</div>
      <div className='form-control w-full mt-8'>
        <label className='label'>
          <span className='label-text'>제목을 입력해주세요</span>
        </label>
        <input
          type='text'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder='제목을 입력해주세요.'
          className='input input-bordered w-full h-20'
        />
      </div>

      <Editor
        initialValue='hello react editor world!'
        previewStyle='vertical'
        height='600px'
        initialEditType='markdown'
        useCommandShortcut={true}
        ref={toastRef}
      />
      <input
        type='file'
        className='file-input file-input-bordered file-input-info w-96 mr-0 ml-auto mt-4'
        multiple
        onChange={(e) => {
          console.log(e.target.files.length);
          for (let i = 0; i < e.target.files.length; i++) {
            formData.append('files', e.target.files[i]);
          }
        }}
      />
      <button
        className='btn btn-outline btn-info ml-auto mr-0 mt-4 w-24'
        onClick={() => {
          if (title.length === 0 || title == null) {
            alert('제목을 입력해주세요.');
            return;
          }

          if (
            toastRef.current?.getInstance().getHTML().length === 0 ||
            toastRef.current?.getInstance().getHTML() == null
          ) {
            alert('내용을 입력해주세요.');
            return;
          }

          formData.append('title', title);
          formData.append('body', toastRef.current?.getInstance().getHTML());
          const sendData = async () => {
            const data = await axios({
              method: 'POST',
              url: 'http://localhost:8089/article',
              data: formData,
              formData,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(data);

            setTitle('');
            setBody('');
            if (data.status === 200) {
              alert('작성이 성공적으로 완료되었습니다.');
              navigate('/');
            } else {
              alert('뭔가 문제가 있습니다.');
            }
          };
          sendData();
        }}
      >
        완료
      </button>
    </div>
  );
};

export default Write;
