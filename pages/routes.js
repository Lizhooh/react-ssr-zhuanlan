
import Index from './views/index';
import _404 from './views/404';

// 路由表
export default [
    {
        path: '/',
        exact: true,
        component: Index,
    },
    {
        component: _404,
    },
];
