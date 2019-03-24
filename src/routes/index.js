import { asyncComponent } from '@jaredpalmer/after';
import Loading from '../components/Loading';

export default [
    {
        path: '/',
        exact: true,
        component: asyncComponent({
            loader: () => import('../views/Index'),
            Placeholder: Loading,
        }),
    },
    {
        path: '/column/:slug',
        component: asyncComponent({
            loader: () => import('../views/Column'),
            Placeholder: Loading,
        }),
    },
    {
        path: '/detail/:id',
        component: asyncComponent({
            loader: () => import('../views/Detail'),
            Placeholder: Loading,
        }),
    },
];
