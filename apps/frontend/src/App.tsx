// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Импорты БЕЗ алиасов (напрямую)
import CartPage from './pages/CartPage/CartPage';
import ThankYouPage from './pages/ThankYouPage/ThankYouPage';

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        {/* Главная - показываем Cart Page */}
        <Route path="/" element={<CartPage />} />
        
        {/* Cart Page */}
        <Route path="/cart" element={<CartPage />} />
        
        {/* Thank You Page */}
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </div>
  );
};

export default App;