
import Index from './views/index';
import _404 from './views/404';
import Detail from './views/detail';

// 路由表
export default [
    {
        path: '/',
        exact: true,
        component: Index,
    },
    {
        path: '/detail/:id',
        component: Detail,
    },
    {
        component: _404,
    },
];
