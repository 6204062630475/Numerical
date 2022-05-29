import './App.css';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from './Component/AppBar';
import Bisection from './Component/Bisection';
import FalsePosition from "./Component/FalsePosition";
import Newton from "./Component/Newton";
import Equationlist from "./Component/Equationlist"
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppBar />
        <Routes>
          <Route path="/" element={<Bisection />} />
          <Route path="/Bisection" element={<Bisection />} />
          <Route path="/FalsePosition" element={<FalsePosition />} />
          <Route path="/Newton" element={<Newton />} />
          <Route path="/Equations" element={<Equationlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
