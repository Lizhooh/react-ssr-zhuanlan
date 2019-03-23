import api from '../../api';

export const initStateInServer = async (slug, store) => {
    const [info, list] = await Promise.all([
        api.columnInfo(slug),
        api.columnPosts(slug),
    ]);
    store.commit('column', { [slug]: { slug, info, list, next: '加载更多' } });
};

export const loadmore = (slug) => async (commit, getState) => {
    const { list = [] } = getState().column[slug];
    const res = await api.columnPosts(slug, list.length);
    commit('column', {
        list: list.concat(res),
        next: res.length > 0 ? '加载更多' : '没有更多了',
    });
};

