import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import { Provider } from 'react-redux';

import createStore from './stores';
import routes from './routes';

ensureReady(routes).then(data => {
    const { initState, ...rest } = data;
    const store = createStore(initState);

    hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <After data={rest} routes={routes} />
            </BrowserRouter>
        </Provider>
        , document.getElementById('root'),
    );
});

if (module.hot) {
    module.hot.accept();
}


