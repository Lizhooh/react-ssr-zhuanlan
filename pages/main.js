import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import styled from 'styled-components';
import {
    BrowserRouter,
    Route, Switch,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import Store from 'redux-store-init';

import isFunction from 'is-function';
import isEnv from 'is-env';
import routes from './routes';

const App = ({ data = {} }) => (
    <Provider store={Store({ reducers: reducers(data) })}>
        <Switch>{
            // 根据路由表动态渲染路由
            routes.map((item, index) => {
                // 调用 getInitialPropsState 函数
                const C = item.component;
                const initProps = isFunction(C.getInitialPropsState) && C.getInitialPropsState(data);
                if (initProps) {
                    const newC = p => <C {...p} state={initProps} />
                    return <Route key={`route-${index}`} {...item} component={newC} />
                }

                return <Route key={`route-${index}`} {...item} component={C} />
            })
        }
        </Switch>
    </Provider>
);

export default App;

if (isEnv('browser')) {
    hydrate(
        <BrowserRouter>
            <App data={window.__INIT_STATE__} />
        </BrowserRouter>
        ,
        document.getElementById('app')
    );
};
