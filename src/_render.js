
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { matchPath, StaticRouter } from 'react-router-dom';
import { After } from '@jaredpalmer/after';
import loadInitialProps from '@jaredpalmer/after/loadInitialProps';
import * as utils from '@jaredpalmer/after/build/utils';
import * as url from 'url';

const modPageFn = function (Page) {
    return (props) => <Page {...props} />;
};

// 这是一个修复 render 不会注入额外的参数问题：https://github.com/jaredpalmer/after.js/issues/156
export default async function render(options) {
    const { req, res, routes, assets, document: Document, customRenderer, ...rest } = options;
    const Doc = Document;

    const context = {};
    const renderPage = async (fn = modPageFn) => {
        // By default, we keep ReactDOMServer synchronous renderToString function
        const defaultRenderer = (element) => ({ html: ReactDOMServer.renderToString(element) });
        const renderer = customRenderer || defaultRenderer;
        const asyncOrSyncRender = renderer(
            <StaticRouter location={req.url} context={context}>
                {fn(After)({ routes, data })}
            </StaticRouter>
        );

        const renderedContent = utils.isPromise(asyncOrSyncRender) ? await asyncOrSyncRender : asyncOrSyncRender;
        const helmet = Helmet.renderStatic();

        return { helmet, ...renderedContent };
    };


    const { match, data } = await loadInitialProps(routes, url.parse(req.url).pathname, {
        req,
        res,
        ...rest
    });

    if (!match) {
        res.status(404);
        return;
    }

    if (match.path === '**') {
        res.status(404);
    } else if (match && match.redirectTo && match.path) {
        res.redirect(301, req.originalUrl.replace(match.path, match.redirectTo));
        return;
    }

    const reactRouterMatch = matchPath(req.url, match);

    const { html, ...docProps } = await Doc.getInitialProps({
        req,
        res,
        assets,
        renderPage,
        data,
        helmet: Helmet.renderStatic(),
        match: reactRouterMatch,
        ...rest,
    });

    const doc = ReactDOMServer.renderToStaticMarkup(<Doc {...docProps} />);

    return `<!doctype html>${doc.replace('DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP', html)}`;
}