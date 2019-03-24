import api from '../../api';

export default ({ commit }) => ({
    initState: {
        default: {
            id: 0,
            data: {},
            recommend: [],
        },
    },

    async initStateInServer(id) {
        const [data, recommend] = await Promise.all([
            api.articleDetail(id),
            api.recommendArticle(id),
        ]);
        commit({ [id]: { id, data, recommend } });
    },
});

