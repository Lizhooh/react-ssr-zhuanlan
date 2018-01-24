import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';

const cp = require('child_process');
const fs = require('fs');
const util = require('util');
const exists = util.promisify(fs.exists);

let flag = false;

/**
 * 渲染函数
 * @param{Object} ctx
 * @param{String} page 页面名次
 * @return{Object} Promise
 */
export default async function (ctx, page) {
    const path = `./pages/${page}.js`;
    if (!(await exists(path))) {
        return Promise.reject('page be not in');
    }

    if (process.env.NODE_ENV !== 'production') {
        if (!flag && (flag = true)) {
            const parcel = cp.exec(`parcel build ${path} -d public`);
            parcel.on('exit', () => flag = false);
            parcel.on('error', err => flag = false);
        }
    }

    const App = require(path).default;
    const sheet = new ServerStyleSheet();
    const body = renderToString(
        <StaticRouter context={{}} location={ctx.url}>
            {sheet.collectStyles(<App />)}
        </StaticRouter>
    );
    const styleTags = sheet.getStyleTags();

    const html = ctx.app.cache.get('page-index')
        .replace(/\{:styles\}/, styleTags)
        .replace(/\{:body\}/, body)
        .replace(/\{:sctipt\}/, `/static/${page}.js`);
    ;

    return html || '';
}
