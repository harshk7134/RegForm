import Form from './components/form';
import React from 'react';
import ShowData from './components/showData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/showData" element={<ShowData />} />
      </Routes>
    </Router>
  );
}

export default App;
