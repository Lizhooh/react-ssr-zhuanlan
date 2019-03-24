import api from '../../api';

export default ({ commit, getState }) => ({
    initState: {
        default: {
            slug: '',
            info: {},
            list: [],
            next: '加载更多',
        },
    },

    async initStateInServer(slug) {
        const [info, list] = await Promise.all([
            api.columnInfo(slug),
            api.columnPosts(slug),
        ]);
        commit({ [slug]: { slug, info, list, next: '加载更多' } });
    },
    async loadmore(slug) {
        const data = getState()[slug];
        const res = await api.columnPosts(slug, data.list.length);

        data.list = data.list.concat(res);
        data.next = res.length > 0 ? '加载更多' : '没有更多了';

        commit({ [slug]: data });
    },
});

