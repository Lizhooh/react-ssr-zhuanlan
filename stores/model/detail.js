import api from '../../api';

export default () => ({
    initState: {
        default: {
            id: 0,
            data: {},
            recommend: [],
        },
    },

    async initStateInServer(id, store) {
        const [data, recommend] = await Promise.all([
            api.articleDetail(id),
            api.recommendArticle(id),
        ]);
        store.commit('detail', { [id]: { id, data, recommend } });
    },
});