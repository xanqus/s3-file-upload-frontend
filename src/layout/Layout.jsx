import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='mt-20 mx-auto'>{children}</main>
    </>
  );
};

export default Layout;
