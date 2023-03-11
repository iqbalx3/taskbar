import './App.css';
import Task from './Task';
import Container from './Container';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import History from './History';
import React, { useEffect, useState } from 'react';

function App() {

  return (
    <div className="App">
      {/* <Task /> */}
      {/* <Container /> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Container />} />


          <Route path="/history" element={<History />} />


        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
