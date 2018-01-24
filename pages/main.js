import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import styled from 'styled-components';
import {
    BrowserRouter,
    Route, Switch,
} from 'react-router-dom';
import isEnv from 'is-env';
import routes from './routes';

function isFunction(obj) {
    return typeof obj === 'function';
}

const App = ({ data = {} }) => (
    <Switch>{
        // 根据路由表动态渲染路由
        routes.map((item, index) => {
            // 调用 getInitialPropsState 函数
            if (isEnv('browser')) {
                data.state = window.__INIT_STATE__;
            }
            const C = item.component;
            const initProps = isFunction(C.getInitialPropsState) ? C.getInitialPropsState(data) : {};
            const newC = p => <C {...p} state={initProps} />
            return <Route key={`route-${index}`} {...item} component={newC} />
        })
    }
    </Switch>
);

export default App;

if (isEnv('browser')) {
    console.log('dad');
    const { Provider } = require('react-redux');
    const store = require('./redux/store').default;
    hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('app')
    );
};
