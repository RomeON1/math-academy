import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n'; // ВАЖНО: импорт перед рендером
import './App.css';   // 👈 вместо ./styles/index.css
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
