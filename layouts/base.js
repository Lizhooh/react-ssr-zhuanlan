import React from 'react';
import Head from 'next/head';

// 基本的布局
export default ({ children }) => (
    <div>
        <Head key='head'>
            <title>知乎专栏</title>
            <meta charSet='utf-8' />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <meta name="referrer" content="never" />
            <link rel="icon" href="/static/favicon.ico" />
            <link rel="stylesheet" href="/static/app.css" />
            <link href="/static/nprogress.min.css" rel="stylesheet" />
        </Head>
        {children}
    </div>
);

