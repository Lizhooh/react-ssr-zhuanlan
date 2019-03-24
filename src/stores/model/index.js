import api from '../../api';

export default ({ commit }) => ({
    initState: {
        list: [],
    },

    async initStateInServer() {
        const res = await api.recommendColumn();
        commit({ list: res });
    },
    async update() {
        const res = await api.recommendColumn();
        commit({ list: res });
    },
});

