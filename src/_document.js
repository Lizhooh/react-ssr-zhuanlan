import React, { Component } from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
import { ServerStyleSheet } from 'styled-components';
import { Provider } from 'react-redux';

export default class Document extends Component {
    static async getInitialProps({ assets, data, renderPage, store }) {
        const sheet = new ServerStyleSheet();
        // Document 这里已经经过了 page.getInitialProps，因此获取的 getState 是附带数据的
        // redux 初始化数据放置在 data.initState 上
        data = { ...data, initState: store.getState() };

        const page = await renderPage(App => props => (
            sheet.collectStyles(
                <Provider store={store}>
                    <App {...props} />
                </Provider>
            )
        ));
        const styleTags = sheet.getStyleElement();
        return { assets, data, styleTags, ...page };
    }

    render() {
        const { helmet, assets, data, styleTags } = this.props;
        // get attributes from React Helmet
        const htmlAttrs = helmet.htmlAttributes.toComponent();
        const bodyAttrs = helmet.bodyAttributes.toComponent();

        return (
            <html {...htmlAttrs}>
                <head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta charSet="utf-8" />
                    <meta name="referrer" content="never" />
                    <title>知乎专栏</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet" href='/app.css' />
                    <link rel="stylesheet" href='/nprogress.min.css' />
                    <link rel="stylesheet" href={assets.client.css} />

                    {helmet.link.toComponent()}
                    {helmet.title.toComponent()}
                    {helmet.meta.toComponent()}

                    {styleTags}
                </head>
                <body {...bodyAttrs}>
                    <AfterRoot />
                    <AfterData data={data} />
                    <script
                        type="text/javascript"
                        src={assets.client.js}
                        defer={true}
                        crossOrigin="anonymous"
                    />
                </body>
            </html>
        );
    }
}

