import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import serve from 'koa-static';
import mount from 'koa-mount';
import fs from 'fs';

import render from './render';
import api from './api';

const app = new Koa();
const router = new Router();

app.cache = new Map();
app.cache.set('page-500', fs.readFileSync('./template/500.html').toString());
app.cache.set('page-index', fs.readFileSync('./template/index.html').toString());

router
    .use(async (ctx, next) => {
        if (/.(jpg|png)$/.test(ctx.url)) {
            return ctx.status = 301;
        }
        // 缓存渲染的 html
        if (ctx.app.cache.has(ctx.url)) {
            console.log(ctx.url, 'cache hits.'.green);
            return ctx.body = ctx.app.cache.get(ctx.url);
        }
        await next();
    })
    .get('/api/*', async ctx => {
        ctx.body = await api.any(ctx.url);
    })
    .get('/', async (ctx, next) => {
        ctx.state.index = ctx.state.index || {};
        ctx.state.index.columns = await api.any('/api/recommendations/columns?limit=8');
        await next();
    })
    .get('/column/:name', async (ctx, next) => {
        const { name } = ctx.params;
        // 初始化数据首页数据
        const [info, list] = await Promise.all([
            api.any(`/api/columns/${name}`),
            api.any(`/api/columns/${name}/posts`),
        ]);
        // 专栏信息, 专栏文章列表
        ctx.state.column = { info, list };
        await next();
    })
    .get('/detail/:id', async (ctx, next) => {
        // 初始化详细页数据
        const { id } = ctx.params;
        const [data, recommend] = await Promise.all([
            api.any(`/api/posts/${id}`),
            api.any('/api/recommendations/posts')
        ]);
        // 详细信息，推荐列表
        ctx.state.detail = { ...data, recommend };
        await next();
    })
    .get('/*', async (ctx, next) => {
        const html = render(ctx, 'main');
        ctx.body = html;
    })
    ;

app
    .use(logger())
    .use(mount('/static', serve('./public')))
    .use(router.routes())
    .listen(3000, () => {
        console.log('server run in 3000.');
    });

