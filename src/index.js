import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom'

import {Provider} from 'react-redux'
import {store, persistor } from './redux/store'

import {PersistGate} from 'redux-persist/integration/react'
import { FirebaseAppProvider } from "reactfire";
import {config} from './firebase/firebase.utils'


ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={config}>
      <Suspense
      fallback={
        <div>
          Loading...
         </div>
      }
    >
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById('root')
);
