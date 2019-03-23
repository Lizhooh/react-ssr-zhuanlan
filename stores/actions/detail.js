import api from '../../api';

export const initStateInServer = async (id, store) => {
    const [data, recommend] = await Promise.all([
        api.articleDetail(id),
        api.recommendArticle(id),
    ]);
    store.commit('detail', { [id]: { id, data, recommend } });
};


