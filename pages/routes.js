
import Index from './views/index';
import Column from './views/column';
import Detail from './views/detail';
import _404 from './views/404';

// 路由表
export default [
    {
        path: '/',
        exact: true,
        component: Index,
    }, {
        path: '/column/:name',
        component: Column,
    },
    {
        path: '/detail/:id',
        component: Detail,
    },
    {
        component: _404,
    },
];
