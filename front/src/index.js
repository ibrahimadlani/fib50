import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
document.querySelector('body').classList.add('h-full');
document.querySelector('html').classList.add('h-full', 'bg-white');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
