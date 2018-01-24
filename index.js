import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import serve from 'koa-static';
import mount from 'koa-mount';
import favicon from 'koa-favicon';
import fetch from 'isomorphic-fetch';
import fs from 'fs';

import render from './render';

const app = new Koa();
const router = new Router();

app.cache = new Map();
app.cache.set('page-500', fs.readFileSync('./template/500.html').toString());
app.cache.set('page-index', fs.readFileSync('./template/index.html').toString());

router
    .get('/api/*', async ctx => {
        await fetch('https://zhuanlan.zhihu.com' + ctx.url)
            .then(res => res.json())
            .then(res => ctx.body = res)
            .catch(err => ctx.body = { error: err.message });
    })
    .get('/*', async ctx => {
        await render(ctx, 'index')
            .then(res => ctx.body = res)
            .catch(err => {
                console.error(err);
                ctx.status = 500;
                ctx.body = ctx.app.cache.get('page-500');
            });
    })
    ;

app
    .use(favicon('./public/favicon.ico'))
    .use(logger())
    .use(mount('/static', serve('./public')))
    .use(router.routes())
    .listen(3000, () => {
        console.log('server run in 3000.');
    });

