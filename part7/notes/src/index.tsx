import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <Router>
      <App />
    </Router>
  );
}
