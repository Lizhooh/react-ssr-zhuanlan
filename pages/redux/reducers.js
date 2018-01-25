import isFunction from 'is-function';

// 初始化 reducers
export default (INIT_STATE) => {
    const index_init_state = INIT_STATE.index || {};
    const detail_init_state = INIT_STATE.detail || {};

    return {
        // 主页
        index: (state = index_init_state, action) => {
            if (action.type = 'index' && isFunction(action.newState)) {
                return action.newState(state, action, index_init_state);
            }
            return state;
        },
        // 详细页
        detail: (state = detail_init_state, action) => {
            if (action.type = 'detail' && isFunction(action.newState)) {
                return action.newState(state, action, detail_init_state);
            }
            return state;
        },
    }
}


