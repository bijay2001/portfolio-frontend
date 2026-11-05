// src/App.jsx  (REPLACE)
import { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Loader from './components/loader';

function Shell() {
  const { theme } = useTheme();

  // Intro loader: home page only, once per browser session
  const [loading, setLoading] = useState(() => {
    try { return window.location.pathname === '/' && !sessionStorage.getItem('bk-intro'); }
    catch { return false; }
  });

  const finish = useCallback(() => {
    try { sessionStorage.setItem('bk-intro', '1'); } catch { /* ignore */ }
    setLoading(false);
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        richColors
        theme={theme}
        toastOptions={{ style: { borderRadius: '100px', padding: '12px 20px' } }}
      />
      <AnimatePresence>{loading && <Loader key="loader" onDone={finish} />}</AnimatePresence>
      <AppRoutes />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </ThemeProvider>
  );
}