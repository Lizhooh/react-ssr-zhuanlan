import api from '../../api';

export const initStateInServer = async (store) => {
    const res = await api.recommendColumn();
    store.commit('index', { list: res });
};

export const update = () => async commit => {
    const res = await api.recommendColumn();
    commit('index', { list: res });
};


