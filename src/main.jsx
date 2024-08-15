import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Index from './components/index.jsx'
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux"
import { store } from './reduxApp/store.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <Index />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
)
