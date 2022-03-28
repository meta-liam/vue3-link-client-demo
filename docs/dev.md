# 测试xlink

## 新项目

```shell

// 创建项目
npm install -g create-vite-app
cva jtest-vue3
npm i

// 支持typescript
npm install typescript --save-dev
npx tsc --init
（配置 tsconfig.json）(加入 shim.d.ts文件)

// 测试环境
npm install --save-dev jest typescript ts-jest @types/jest
(配置jest.config.js)(配置package.json)
npm run test
npm run test:coverage

// vue页面 test
npm install @vue/test-utils --save-dev
（jest.config.js配置 testEnvironment）
npm install --save-dev babel-jest @vue/vue3-jest

```

参考：
https://test-utils.vuejs.org/guide/

https://jestjs.io/docs/getting-started

## 快速开始

```shell
npm i --registry=https://registry.npmmirror.com
npm i link-node
```

## 问题

.vue 文件无法测试！

## 测试客户端

## 打包测试

bug:
[bug](./build.md)
