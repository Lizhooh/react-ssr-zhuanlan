import api from '../../api';

export default ({ commit }) => ({
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
    async update() {
        const res = await api.recommendColumn();
        commit({ list: res });
    },
});

