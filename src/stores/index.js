import Easy, { createModel } from 'redux-easy-action';

import indexModal from './model/index';
import detailModal from './model/detail';
import columnModal from './model/column';

let easy = null;

export default (initState = {
    index: { list: [] },
    detail: {},
    column: {},
}) => {
    easy = Easy({
        initState: initState,
        devtool: true,
        model: {
            index: createModel('index', indexModal),
            detail: createModel('detail', detailModal),
            column: createModel('column', columnModal),
        },
    });
    const store = easy.store;
    store.commit = easy.commit;

    return store;
};
export const getAction = (name) => easy.actions[name];
export const getModel = (name) => easy.models[name];
export const getStore = () => easy.store;
