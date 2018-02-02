# 项目预览

https://heikaimu.github.io/douban-movie/dist

# 安装基础项目

## 安装angular-cli:
```
npm install -g @angular/cli
```
## 创建新项目
```
ng new projectName
```
## 进入项目下载依赖
```
cd projectName
npm install
```
## 启动项目

注意：如果angular-cli版本在1.6以上会报一个警告（angular-devkit/core不存在），需要手动安装
```
npm i --save-dev @angular-devkit/core
```
现在运行ng serve 或者 npm start成功启动项目

## 安装scss
```
npm install node-sass --save-dev
```
将angular-cli.json文件中的styleExt修改为
"defaults": {
     "styleExt": "scss",
}

## 安装 ng-zorro

npm install ng-zorro-antd --save，然后在app.module.ts里引入
import { NgZorroAntdModule } from 'ng-zorro-antd';
imports: [ NgZorroAntdModule.forRoot() ]

## 安装jquery

之所以用到jquery是因为httpClient的jsonp豆瓣api不支持没想到别的办法，在本地测试的时候可以通过配置代理来解决

回到正题，如何安装jquery

```
npm install --save jquery
npm install -D @types/jquery
import * as $ from 'jquery';
$('body').addClass('');
```

# 项目索遇到的各种坑

## 配置代理服务器

新建 proxy.conf.json，内容如下
```
{
  "/v2": {
    "target": "http://api.douban.com",
    "secure": false,
    "changeOrigin": true
  }
}
```
修改package.json里的"start": "ng serve  --proxy-config proxy.conf.json"

这是一个巨坑，在网上查找了半天都只有target和secure，结果各种报错，折腾了一天最后终于找到原因，原来是还少了一句"changeOrigin": true。

## 打包的路径配置

修改package.json里面的 "build": "ng build --base-href ./ --prod", base-href根据情况而定。
