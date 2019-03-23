import api from '../../api';

export const initStateInServer = async (slug, store) => {
    const [info, list] = await Promise.all([
        api.columnInfo(slug),
        api.columnPosts(slug),
    ]);
    store.commit('column', { [slug]: { slug, info, list, next: '加载更多' } });
};

export const loadmore = (slug) => async (commit, getState) => {
    const data = getState().column[slug];
    const res = await api.columnPosts(slug, data.list.length);

    data.list = data.list.concat(res);
    data.next = res.length > 0 ? '加载更多' : '没有更多了';

    commit('column', { [slug]: data });
};

