import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authenticatedState } from '../recoil/store';

const Header = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useRecoilState(authenticatedState);
  return (
    <header>
      <div className='navbar bg-base-100'>
        <div
          className='flex-1'
          onClick={() => {
            navigate('/');
          }}
        >
          <a className='btn btn-ghost normal-case text-xl'>sbs 커뮤니티</a>
        </div>
        <div className='flex-none gap-2'>
          <div className='form-control'>
            <input
              type='text'
              placeholder='Search'
              className='input input-bordered search-input'
            />
          </div>

          {authenticated ? (
            <div
              className='cursor-pointer'
              onClick={() => {
                setAuthenticated(false);
                localStorage.removeItem('login-token');
              }}
            >
              로그아웃
            </div>
          ) : (
            <div
              className='cursor-pointer'
              onClick={() => {
                navigate('/login');
              }}
            >
              로그인
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
