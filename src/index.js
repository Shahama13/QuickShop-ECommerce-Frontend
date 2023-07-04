import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/search';
import 'antd/dist/reset.css'
import { CartProvider } from './context/cart';

export const server = "http://localhost:4000"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <Router>
          <App />
        </Router>
      </CartProvider>
    </SearchProvider >
  </AuthProvider>
);

