import fetch from 'isomorphic-fetch';
import nprogress from 'nprogress';
import isEnv from 'is-env';

/**
 * 发起一个 GET 请求
 * @param {String} url
 */
const get = (url) => {
    url = 'http://127.0.0.1:3000' + url;

    const isBrowser = isEnv('browser');
    if (isBrowser) {
        nprogress.start();
    }
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            nprogress.done();
            if (isBrowser) {
                console.log(`[${url}] Result:`, res);
            }
            return res;
        })
        .catch(err => {
            console.error(`[${url}] Error: ${err.message}`);
        });
}

/** 推荐专栏数据 */
export const recommendColumn = async (index) => {
    const randNum = index || (Math.random() * 300 | 0);
    const result = await get(`/api/recommendations/columns?limit=8&offset=${randNum}`);
    if (!result) return [];
    return result.data;
}

/** 专栏信息数据 */
export const columnInfo = async (slug) => {
    return get(`/api/columns/${slug}`);
}

/** 专栏文章列表数据 */
export const columnPosts = async (slug, offset = 0) => {
    const result = await get(`/api/columns/${slug}/posts?offset=${offset}`);
    if (!result) return [];
    return result.data;
}

/** 文章详细数据 */
export const articleDetail = async (id = 0) => {
    return get(`/api/posts/${id}`);
}

/** 专栏文章推荐数据 */
export const recommendArticle = async (id, index) => {
    const randNum = index || (Math.random() * 300 | 0);
    const result = await get(`/api/articles/${id}/recommendation?offset=${randNum}`);
    if (!result) return [];
    return result.data;
}

export default {
    columnPosts,
    columnInfo,
    articleDetail,
    recommendArticle,
    recommendColumn,
};


