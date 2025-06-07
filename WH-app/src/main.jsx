import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { store, persistor } from './redux/store'; // import du persistor
import { PersistGate } from 'redux-persist/integration/react'; // import PersistGate

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);