import Store, { createReducer } from 'redux-store-init';
import logger from 'redux-diff-logger';

// 自定义一个 commit 取代 dispatch
const commit = (dispatch) => (name, newState) => dispatch({
    type: name,
    newState: typeof newState === 'function' ?
        newState :
        state => ({ ...state, ...newState }),
});

// 自定义的 redux-thunk
const thunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        try {
            return action(commit(dispatch), getState);
        }
        catch (err) {
            console.error(err);
            return getState();
        }
    }
    return next(action);
};

// create store
export default (initState = {
    index: { list: [] },
    detail: {},
    column: { info: {}, list: [] },
}) => {
    const store = Store({
        initState: initState,
        reducers: {
            index: createReducer('index', initState.index),
            detail: createReducer('detail', initState.detail),
            column: createReducer('column', initState.column),
        },
        devtool: true,
        applyMiddlewares: [thunk],
    });

    store.commit = commit(store.dispatch);

    return store;
};

