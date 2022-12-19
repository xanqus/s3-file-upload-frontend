import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import { uuidv4 } from '../utils/utils';
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';
import { BACKEND_URL } from '../utils';
import Layout from '../layout/Layout';

const Write = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageIdList, setImageIdList] = useState([]);
  const [searchParams] = useSearchParams();

  const formData = new FormData();
  const toastRef = useRef();

  useEffect(() => {
    if (searchParams.get('id')) {
      const getTmpArticle = async () => {
        const tmpArticle = await axios({
          method: 'GET',
          url: `${BACKEND_URL}/article/tmp?articleUniqueId=${searchParams.get(
            'id'
          )}`,
        });
        setTitle(tmpArticle.data.title);
        setBody(tmpArticle.data.body);
        setArticle(tmpArticle.data);
      };
      getTmpArticle();
    }
  }, []);

  return (
    <Layout>
      <div className='flex flex-col max-w-5xl m-auto'>
        <button
          className='btn btn-outline btn-info ml-auto mr-0 mt-4 w-24'
          onClick={() => {
            navigate('/');
          }}
        >
          메인으로
        </button>
        <input
          type='text'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder='제목을 입력해주세요'
          className='h-24  text-3xl'
        />

        <Editor
          initialValue='내용을 작성해주세요.'
          previewStyle='vertical'
          height='600px'
          initialEditType='markdown'
          useCommandShortcut={true}
          ref={toastRef}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const formData = new FormData();
              formData.append('file', blob);
              const data = await axios({
                method: 'POST',
                url: `${BACKEND_URL}/article/image`,
                data: formData,
              });
              setImageIdList((prev) => prev.concat(parseInt(data.data.id)));

              // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.

              // 2. 첨부된 이미지를 화면에 표시
              callback(data.data.imgUrl, '');
            },
          }}
        />
        <div className='flex'>
          <button
            className='btn btn-outline btn-info ml-auto mr-8 mt-4 w-24'
            onClick={() => {
              formData.append('title', title);
              formData.append(
                'body',
                toastRef.current?.getInstance().getMarkdown()
              );
              if (searchParams.get('id')) {
                axios({
                  method: 'PATCH',
                  url: `${BACKEND_URL}/article/tmpSave?articleUniqueId=${searchParams.get(
                    'id'
                  )}`,
                  data: formData,
                });
                return;
              }
              if (
                title === '' ||
                toastRef.current?.getInstance().getMarkdown() === ''
              ) {
                alert('제목 또는 내용이 비어있습니다.');
                return;
              }
              formData.append('title', title);
              formData.append(
                'body',
                toastRef.current?.getInstance().getMarkdown()
              );
              const uuid = uuidv4();
              navigate(`/write?id=${uuid}`, { replace: true });
              axios({
                method: 'POST',
                url: `${BACKEND_URL}/article/tmpSave?articleUniqueId=${uuid}`,
                data: formData,
              });
            }}
          >
            임시 저장
          </button>
          <button
            className='btn btn-outline btn-info mr-0 mt-4 w-24'
            onClick={() => {
              if (searchParams.get('id')) {
                // console.log(article);
                formData.append('title', title);
                formData.append(
                  'body',
                  toastRef.current?.getInstance().getMarkdown()
                );
                axios({
                  method: 'PATCH',
                  url: `${BACKEND_URL}/article/completeSave?articleUniqueId=${searchParams.get(
                    'id'
                  )}`,
                  data: formData,
                });
                navigate('/');
                return;
              }
              if (
                toastRef.current?.getInstance().getMarkdown().length === 0 ||
                toastRef.current?.getInstance().getMarkdown() == null
              ) {
                alert('내용을 입력해주세요.');
                return;
              }

              formData.append('title', title);
              formData.append(
                'body',
                toastRef.current?.getInstance().getMarkdown()
              );
              formData.append('imageIdList', imageIdList);
              const sendData = async () => {
                const data = await axios({
                  method: 'POST',
                  url: `${BACKEND_URL}/article`,
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
      </div>
    </Layout>
  );
};

export default Write;
