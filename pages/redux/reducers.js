import isFunction from 'is-function';

// 初始化 reducers
export default (INIT_STATE) => {
    const index_init_state = { ...INIT_STATE.index, page: 1 };
    const column_init_state = { ...INIT_STATE.column, next: '加载更多', page: 1 };
    const detail_init_state = { ...INIT_STATE.detail };

    return {
        // 主页
        index: (state = index_init_state, action) => {
            if (action.type === 'index' && isFunction(action.newState)) {
                return action.newState(state, index_init_state) || state;
            }
            return state;
        },
        // 专栏页
        column: (state = column_init_state, action) => {
            if (action.type === 'column' && isFunction(action.newState)) {
                return action.newState(state, column_init_state) || state;
            }
            return state;
        },
        // 详细页
        detail: (state = detail_init_state, action) => {
            if (action.type === 'detail' && isFunction(action.newState)) {
                return action.newState(state, detail_init_state) || state;
            }
            return state;
        },
    }
}


