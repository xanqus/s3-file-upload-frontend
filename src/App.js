import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './routes/Detail';
import Home from './routes/Home';
import Write from './routes/Write';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/write' element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
