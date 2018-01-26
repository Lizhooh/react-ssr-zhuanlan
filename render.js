import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';

const cp = require('child_process');
const fs = require('fs');
const util = require('util');
const exists = util.promisify(fs.exists);

let flag = false;

function replaces(str, obj) {
    Object.keys(obj).forEach(key => {
        str = str.replace(new RegExp(`\\{:${key}\\}`), obj[key]);
    });
    return str;
}

function buildJS() {
    if (!flag && (flag = true)) {
        const parcel = cp.exec(`parcel build ./pages/main.js -d public`);
        parcel.on('exit', () => {
            console.log('web resource compilation completed.');
            flag = false;
        });
        parcel.on('error', err => flag = false);
    }
}

process.env.NODE_ENV === 'production' && buildJS();

/**
 * 服务端渲染函数
 * @param{Object} ctx
 * @return{String}
 */
export default function (ctx) {
    process.env.NODE_ENV !== 'production' && buildJS();

    const App = require('./pages/app.js').default;
    const sheet = new ServerStyleSheet();
    const body = renderToString(
        <StaticRouter context={{}} location={ctx.url}>
            {sheet.collectStyles(
                <App data={ctx.state} />
            )}
        </StaticRouter>
    );

    const html = replaces(ctx.app.cache.get('page-index'), {
        style: sheet.getStyleTags(),
        body: body,
        state: JSON.stringify(ctx.state),
        sctipt: `/static/main.js`,
    });

    ctx.app.cache.set(ctx.url, html);
    return html || '';
}

