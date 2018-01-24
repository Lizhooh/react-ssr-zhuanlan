import fetch from 'isomorphic-fetch';

function any(path) {
    try {
        return fetch('https://zhuanlan.zhihu.com' + path).then(res => res.json());
    }
    catch (err) {
        return { error: err.message };
    }
}

export default {
    any: (path) => any(path),
    detail: (id) => any('/api/posts/' + id),
}
