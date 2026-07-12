// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner'; // Import Sonner

function App() {
  return (
    <BrowserRouter>
       {/* Global Toaster Configuration for Dynamic Island Look */}
       <Toaster 
          position="top-center" 
          richColors 
          theme="dark" 
          toastOptions={{
             style: { borderRadius: '100px', padding: '12px 20px' }
          }} 
       />
       <AppRoutes />
    </BrowserRouter>
  );
}

export default App;