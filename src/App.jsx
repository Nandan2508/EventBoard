// eslint-disable-next-line no-unused-vars
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Student from './student.jsx';  // or wherever your Student component is located
import AdminPortal from './AdminPortal.jsx';


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Student/>} />
      </Routes>
    </Router>
    <AdminPortal></AdminPortal>
    </>
    
  );
};

export default App;
