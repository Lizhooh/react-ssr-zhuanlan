import api from '../../api';

export default ({ commit }) => ({
    initState: {
        list: [],
    },

    async initStateInServer(store) {
        const res = await api.recommendColumn();
        store.commit('index', { list: res });
    },
    async update() {
        const res = await api.recommendColumn();
        commit({ list: res });
    },
});