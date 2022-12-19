import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Layout from '../layout/Layout';
import { authenticatedState } from '../recoil/store';
import { BACKEND_URL } from '../utils';

const Login = ({ to }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const setAuthenticated = useSetRecoilState(authenticatedState);

  const onChangeIdInput = (e) => {
    setUserId(e.target.value);
  };

  const onChangePasswordInput = (e) => {
    setUserPassword(e.target.value);
  };
  const doLogin = (e) => {
    e.preventDefault();
    const login = async () => {
      const data = await axios({
        method: 'POST',
        url: `${BACKEND_URL}/login`,
        data: {
          username: userId,
          password: userPassword,
        },
      });
      if (data.status === 200) {
        if (data.headers.authorization) {
          setAuthenticated(true);
          localStorage.setItem('login-token', data.headers.authorization);
          if (location.pathname === '/login') return navigate('/');
          alert('로그인 성공');
        }
      } else {
        alert('로그인 실패');
        return;
      }
    };
    login();
  };
  return (
    <Layout>
      <div className='ml-8 mt-8'>
        <h1 className='text-3xl h-16'>Login</h1>
        <form onSubmit={doLogin} className='flex flex-col'>
          <input
            type='text'
            placeholder='ID'
            className='login-input'
            value={userId}
            onChange={onChangeIdInput}
          />
          <input
            type='password'
            placeholder='password'
            className='login-input'
            value={userPassword}
            onChange={onChangePasswordInput}
          />
          <button type='submit' className='w-32'>
            완료
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
