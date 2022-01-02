import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType  } from "@azure/msal-browser";
import { msalConfig } from "../src/config/msalConfig";

// Darag and Drop imports
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

// Import all FontAwesome icons
const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix")
    .map(icon => Icons[icon])

library.add(...iconList)

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

export const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account;
        msalInstance.setActiveAccount(account);
    }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={baseUrl}>
        <MsalProvider instance={msalInstance}>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </MsalProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
