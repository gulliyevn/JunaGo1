import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

// Import i18n
import './i18n';

// Конфигурация для Monaco Editor
window.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId, label) {
    if (label === 'json') {
      return '/static/json.worker.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return '/static/css.worker.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return '/static/html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return '/static/ts.worker.js';
    }
    return '/static/editor.worker.js';
  },
};

// Ensure scrolling works properly
document.documentElement.style.overflowY = 'auto';
document.body.style.overflowY = 'auto';

// Create root and render app
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}


