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
}

export const index = {
    init: () => dispatch => {
        Promise.all([
            get(`${origin()}/api/columns/qianduanzhidian`),
            get(`${origin()}/api/columns/qianduanzhidian/posts`),
        ]).then(([info, list]) => {
            dispatch({
                type: 'index',
                newState: (state) => ({ ...state, info, list, page: 1 })
            });
        });
    },
    more: (page = 2) => dispatch => {
        get(`${origin()}/api/columns/qianduanzhidian/posts?offset=${(page - 1) * 10}`).then(res => {
            dispatch({
                type: 'index',
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
        const { list = []} = getState().index;
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
