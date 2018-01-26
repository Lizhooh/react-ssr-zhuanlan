import fetch from 'isomorphic-fetch';
import fs from 'fs';

const cachepath = '.json';
if (!fs.existsSync(cachepath)) {
    fs.writeFileSync(cachepath, JSON.stringify({}));
}

const cache = JSON.parse(fs.readFileSync(cachepath).toString());

export default {
    any: async (path) => {
        try {
            if (cache[path]) {
                const { time, data } = cache[path];
                // 缓存时间： 7 天
                if (Date.now() - time < 7 * 1440 * 60 * 1000 && data) {
                    console.log(path, 'cache hits.'.green);
                    return data;
                }
            }
            const res = await fetch('https://zhuanlan.zhihu.com' + path).then(res => res.json());
            cache[path] = {
                time: Date.now(),
                data: res,
            };
            fs.writeFile(cachepath, JSON.stringify(cache), _ => _);
            return res;
        }
        catch (err) {
            return { error: err.message };
        }
    },
}
