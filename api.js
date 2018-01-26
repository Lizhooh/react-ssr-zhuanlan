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
                // 缓存时间： 60 分钟
                if (Date.now() - time < 1000 * 60 * 60 && data.length > 0) {
                    console.log(path, '缓存命中');
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
