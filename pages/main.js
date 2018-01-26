import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

hydrate(
    <BrowserRouter>
        <App data={window.__INIT_STATE__} />
    </BrowserRouter>,
    document.getElementById('app')
);
