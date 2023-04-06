import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CounterContextProvider } from './CounterContext';

const root = document.getElementById('root');
if (root) {
  root.render(
    <CounterContextProvider>
      <App />
    </CounterContextProvider>,
  );
} else {
  console.error('Could not find root element.');
}
