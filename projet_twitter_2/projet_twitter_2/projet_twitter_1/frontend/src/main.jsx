import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './composants/App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
);
