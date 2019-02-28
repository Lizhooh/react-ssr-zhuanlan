const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const Next = require('next');
const fs = require('fs');
const unit = require('util');
const fetch = require('isomorphic-fetch');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const app = Next({ dev });
const handle = app.getRequestHandler();
const server = new Koa();
const router = new Router();

const writeFile = unit.promisify(fs.writeFile);

// api 简单代理
router.get('/api/*', async ctx => {
    const url = ctx.url;
    let data = {};

    if (server.cache[url]) {
        console.log('缓存命中：' + url);
        data = server.cache[url];
    }
    else {
        data = await fetch(`https://zhuanlan.zhihu.com/${url}`)
            .then(res => res.json());
        // 缓存
        server.cache[url] = data;
        await writeFile('./.json/data.json', JSON.stringify(server.cache));
    }
    ctx.body = data;
});

router.get('/detail/:id', async ctx => {
    const queryParams = { id: ctx.params.id };
    await app.render(ctx.req, ctx.res, '/detail', queryParams);
});

router.get('/column/:slug', async ctx => {
    const queryParams = { slug: ctx.params.slug };
    await app.render(ctx.req, ctx.res, '/column', queryParams);
});

router.get('*', async ctx => {
    if (ctx.url === '/_next/webpack-hmr' && process.env.NODE_ENV === 'production') {
        ctx.res.statusCode = 302;
        return;
    }
    await handle(ctx.req, ctx.res);
    ctx.res.statusCode = 200;
    ctx.respond = false;
});

server.cache = require('./.json/data.json') || {};

server
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods());

+ async function start() {
    await app.prepare();
    server.listen(port, () => {
        console.log(`> Ready on http://127.0.0.1:${port}`)
    });
}();

