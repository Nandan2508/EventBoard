// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Student from './student';  // or wherever your Student component is located

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Student/>} />
      </Routes>
    </Router>
  );
};

export default App;
