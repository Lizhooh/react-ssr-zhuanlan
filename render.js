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

/**
 * 服务端渲染函数
 * @param{Object} ctx
 * @return{Object} Promise
 */
export default async function (ctx) {
    const path = `./pages/main.js`;
    if (!(await exists(path))) {
        return Promise.reject('page be not in');
    }

    if (process.env.NODE_ENV !== 'production') {
        // 编译前端 js 代码
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
            {sheet.collectStyles(
                <App data={{ state: ctx.state }} />
            )}
        </StaticRouter>
    );

    const html = replaces(ctx.app.cache.get('page-index'), {
        style: sheet.getStyleTags(),
        body: body,
        state: JSON.stringify(ctx.state),
        sctipt: `/static/main.js`,
    });

    return html || '';
}

