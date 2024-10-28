import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import BookingPage from './BookingPage';
import Team from './Team';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path='/team' element={<Team />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
