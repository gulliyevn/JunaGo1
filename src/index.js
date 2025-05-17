import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/variables.css';
import './styles/global.css';
import App from './App';

// Проверим, существует ли элемент с id="root"
const rootElement = document.getElementById('root');
if (!rootElement) {
    console.error('Failed to find the root element');
} else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}


