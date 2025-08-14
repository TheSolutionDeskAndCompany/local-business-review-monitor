import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Lazy load components for better performance
const Landing = lazy(() => import('./components/Landing'));
const Pricing = lazy(() => import('./components/Pricing'));
const Security = lazy(() => import('./components/Security'));
const Privacy = lazy(() => import('./components/Privacy'));
const Terms = lazy(() => import('./components/Terms'));
const Contact = lazy(() => import('./components/Contact'));
const Dashboard = lazy(() => import('./components/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      {/* Skip link for keyboard users */}
      <a 
        href="#main" 
        className="skip-link" 
        style={{
          position: 'absolute',
          left: -9999,
          top: 'auto',
          width: 1,
          height: 1,
          overflow: 'hidden',
          zIndex: -1
        }}
      >
        Skip to content
      </a>
      
      <main id="main">
        <Suspense fallback={
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              backgroundColor: '#f8fafc'
            }}
            aria-busy="true"
          >
            Loading…
          </div>
        }>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/security" element={<Security />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>

  );
}

export default App;
