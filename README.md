# flea-market

## 项目介绍

本项目是北京理工大学计算机学院大三软件工程基础的课程项目。

项目结构如下：

- apis：存放接口定义函数
- assets：存放项目中用到的资源文件
- components：存放全局`Vue`组件
- router：存放路由
- stores：存放状态
- utils：存放用到了的一些工具
- views：项目的主要的代码文件夹

## 主要依赖

1. Vue3
2. UI框架：[TDesign](https://tdesign.tencent.com/vue-next/overview)
3. Axios
4. scss
5. 数据持久化插件：[pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate)

## 项目配置

1. 接口地址：修改`src/utils/http.js`

   ```javascript
   const httpInstance = axios.create({
     baseURL: '**接口地址**',
     timeout: 5000
   })
   ```

2.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
