import React from 'react'
import App, { Container } from 'next/app';
import BaseLayout from '../layouts/base';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createStore from '../stores';

export default withRedux(
    createStore
)(class MyApp extends App {
    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <BaseLayout>
                        <Component {...pageProps} />
                    </BaseLayout>
                </Provider>
            </Container>
        );
    }
});
