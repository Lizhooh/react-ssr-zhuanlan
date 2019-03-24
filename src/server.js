import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import serve from 'koa-static';
import fs from 'fs';
import unit from 'util';
import fetch from 'isomorphic-fetch';
import cheerio from 'cheerio';

import document from './_document';
import render from './_render';
import routes from './routes';
import createStore from './stores';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const writeFile = unit.promisify(fs.writeFile);

const app = new Koa();
const router = new Router();

app.cache = {};

// api 简单代理
router.get('/api/*', async ctx => {
    const url = ctx.url;
    let data = {};

    if (app.cache[url]) {
        console.log('缓存命中：' + url);
        data = app.cache[url];
    }
    else {
        if (url.indexOf('api/posts') > -1) {
            // 文章详细页 api 被封了（茬）
            // https://zhuanlan.zhihu.com/p/45248080
            const id = url.replace(/.*posts\/(\d+)/, '$1') * 1;
            const html = await fetch(`https://zhuanlan.zhihu.com/p/${id}`).then(res => res.text());
            const $ = cheerio.load(html);
            try {
                const state = JSON.parse($('#js-initialData').html());
                data = state.initialState.entities.articles[id];
            }
            catch (err) {
                console.error(err);
            }
        }
        else {
            data = await fetch(`https://zhuanlan.zhihu.com/${url}`).then(res => res.json());
        }

        // 缓存
        app.cache[url] = data;
        await writeFile('./.json/data.json', JSON.stringify(app.cache));
    }

    ctx.body = data;
});


router.get('/*', async ctx => {
    ctx.res.status = ctx.res.statusCode;
    ctx.res.redirect = ctx.redirect;

    ctx.body = await render({
        req: ctx.req,
        res: ctx.res,
        routes,
        assets,
        document,
        store: createStore(), // 将 redux store 传进去
    });
});

app
    .use(logger())
    .use(serve(process.env.RAZZLE_PUBLIC_DIR))
    .use(router.routes())
    .use(router.allowedMethods());

export default app;
