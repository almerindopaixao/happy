import React from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.min.css';

function App(): JSX.Element {
  return (
    <>
      <Routes />
      <ToastContainer autoClose={3000} className="toast-container" />
    </>
  );
}

export default App;
