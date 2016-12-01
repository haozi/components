# 模块开发脚手架
> 模块开发脚手架，生成单一dist/index.js 和 dist/index.css

## 使用方法

```
npm install
```

```
npm run dev   # 开发模式
npm run build # 构建文件
npm run test  # 单元测试并报告测试覆盖率
```
npm run dev 会启动一个 http server,
打开网址  http://127.0.0.1:8080/test/index.html 进行开发调试，浏览器会自动刷新

## 测试
本脚手架为方便大家的开发习惯，提供了传统人肉测试和单元测试功能。

* 人肉测试代码写在 test/browser.js 中，刷新浏览器可以看到效果
* 单元测试写在 test 目录下以 _spec.js 命名的文件中。单元测试框架使用的最 futuristic 的 ava, 更多介绍见官网 [https://github.com/avajs/ava](https://github.com/avajs/ava)


## 编码规范
本脚手架使用 [standard](http://standardjs.com/rules.html) 编码风格。 默认 2 空格缩进，禁用分号，字符串单引号优先。

* build 构建线上代码时会禁用 alert 和 debugger，dev 模式下不禁止
* 如果希望对规则进行更改，可调整 .eslintrc.js。 以允许使用分号为例：

> ```
'semi': 2 // 2 为 error，1 为 warning, 0 为不检测， 重启 npm 生效
```
* 希望跳过部分文件检测，可配置 .eslintignore, 语法和 .gitignore 一致
