import fetch from 'isomorphic-fetch';

const origin = () => window.location.origin;

const get = (...arg) => {
    window.NProgress.start();
    return fetch(...arg).then(res => res.json())
        .then(res => {
            window.NProgress.done();
            return res;
        })
        .catch(err => {
            window.NProgress.done();
        })
};

export const index = {
    init: () => dispatch => {
        get(`/api/recommendations/columns?limit=8`).then(res => {
            dispatch({
                type: 'index',
                newState: (state) => ({ ...state, columns: res }),
            });
        });
    },
    update: (page) => (dispatch) => {
        get(`/api/recommendations/columns?limit=8&offset=${page + 1}`).then(res => {
            dispatch({
                type: 'index',
                newState: (state) => ({ ...state, columns: res, page: page + 1 }),
            })
        })
    }
}

export const column = {
    init: (name) => dispatch => {
        Promise.all([
            get(`${origin()}/api/columns/${name}`),
            get(`${origin()}/api/columns/${name}/posts`),
        ]).then(([info, list]) => {
            dispatch({
                type: 'column',
                newState: (state) => ({ ...state, info, list, page: 1 })
            });
        });
    },
    more: (name, page = 2) => dispatch => {
        get(`${origin()}/api/columns/${name}/posts?offset=${(page - 1) * 10}`).then(res => {
            dispatch({
                type: 'column',
                newState: (state) => {
                    if (res.length === 0) return {
                        ...state,
                        next: '没有了'
                    }
                    return {
                        ...state,
                        list: state.list.concat(res),
                        page: page,
                        next: '加载更多'
                    }
                }
            });
        });
    }
}

export const detail = {
    init: (id) => (dispatch, getState) => {
        const { list = []} = getState().column;
        const res = list.find(i => i.slug * 1 === id * 1);
        if (res) {
            dispatch({
                type: 'detail',
                newState: (state) => ({ ...state, ...res }),
            });
        }
        Promise.all([
            get(`${origin()}/api/posts/${id}`),
            get(`${origin()}/api/recommendations/posts`),
        ]).then(([data, recommend]) => {
            dispatch({
                type: 'detail',
                newState: (state) => ({ ...state, ...data, recommend }),
            });
        });
    },
}
