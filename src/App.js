import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from './auth/AuthRoute';
import Detail from './routes/Detail';
import Home from './routes/Home';
import Login from './routes/Login';
import Write from './routes/Write';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route element={<AuthRoute />}>
          <Route path='/write' element={<Write />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
