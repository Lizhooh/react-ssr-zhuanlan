import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import {
    BrowserRouter,
    Route, Switch,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import Store from 'redux-store-init';
import thunk from 'redux-thunk';

import isFunction from 'is-function';
import isEnv from 'is-env';
import routes from './routes';


// App
export default ({ data }) => (
    <Provider store={Store({ reducers: reducers(data), devtool: true }, [thunk])}>
        <Switch>
            {routes.map((item, index) => {
                // 调用 getInitialPropsState 函数
                const C = item.component;
                const initProps = isFunction(C.getInitialPropsState) && C.getInitialPropsState(data);
                if (initProps) {
                    const newC = p => <C {...p} state={initProps} />
                    return <Route key={`route-${index}`} {...item} component={newC} />
                }
                return <Route key={`route-${index}`} {...item} component={C} />
            })}
        </Switch>
    </Provider>
);

