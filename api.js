import fetch from 'isomorphic-fetch';
import fs from 'fs';

function any(path) {
    // 缓存请求数据
    if (!any.cache) {
        any.cache = new Map();
    }
    try {
        if (any.cache.has(path)) {
            const { time, data } = any.cache.get(path);
            // 缓存时间： 10 分钟
            if (Date.now() - time < 1000 * 60 * 10) return data;
        }
        const res = fetch('https://zhuanlan.zhihu.com' + path).then(res => res.json());
        any.cache.set(path, {
            time: Date.now(),
            data: res,
        });
        return res;
    }
    catch (err) {
        return { error: err.message };
    }
}

export default {
    any: (path) => any(path),
}
