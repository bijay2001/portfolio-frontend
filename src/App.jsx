import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar'; // 1. Import your new Navbar here!

function App() {
  return (
    <BrowserRouter>
       {/* 2. Place it here so it renders on every page */}
       <Navbar /> 
       
       <AppRoutes />
    </BrowserRouter>
  );
}

export default App;