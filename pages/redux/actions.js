import fetch from 'isomorphic-fetch';

const origin = () => window.location.origin;

export const index = {
    init: () => dispatch => {
        const url1 = `${origin()}/api/columns/qianduanzhidian`;
        const url2 = `${origin()}/api/columns/qianduanzhidian/posts`;
        Promise.all([
            fetch(url1).then(res => res.json()),
            fetch(url2).then(res => res.json()),
        ]).then(([info, list]) => {
            dispatch({
                type: 'index',
                newState: (state) => ({ ...state, info, list, page: 1 })
            });
        });
    },
    more: (page = 2) => dispatch => {
        const url = `${origin()}/api/columns/qianduanzhidian/posts?offset=${(page - 1) * 10}`;
        fetch(url).then(res => res.json()).then(res => {
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
                newState: (state) => ({ ...state, [id]: res }),
            });
        }
        const url1 = `${origin()}/api/posts/${id}`;
        const url2 = `${origin()}/api/recommendations/posts?seed=${Math.random() * 150 | 0}`;
        Promise.all([
            fetch(url1).then(res => res.json()),
            fetch(url2).then(res => res.json()),
        ]).then(([data, recommend]) => {
            dispatch({
                type: 'detail',
                newState: (state) => ({ ...state, [id]: { ...data, recommend } }),
            });
        });
    },
}
