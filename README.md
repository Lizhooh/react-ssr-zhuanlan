
## React 服务端渲染（SSR）最佳实践
React 服务端渲染（SSR）最佳实践 - 仿知乎专栏的 React SSR Demo。

来自于我的博客：[React 服务端渲染（SSR）最佳实践](http://me.lizhooh.com/2018/01/28/React/Universal%20%E5%90%8C%E6%9E%84/React%20%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%EF%BC%88SSR%EF%BC%89%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/)

**要点：**
- 使用 Koa 提供后端服务。
- 结合了 React 16、React-Router 4、Redux、styled-components 的服务端渲染应用。

### 使用
启动服务后，打开 http://127.0.0.1:3000 后，切换路由并查看源码，体验 SSR 效果。

```bash
git clone https://github.com/Lizhooh/react-ssr-zhuanlan-demo.git

npm install
# or
yarn

npm start # http://127.0.0.1:3000
```

