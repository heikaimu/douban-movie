# 安装基础项目

## 安装angular-cli:

npm install -g @angular/cli

## 创建新项目

ng new projectName

## 进入项目下载依赖

cd projectName; npm install

## 启动项目

注意：如果angular-cli版本在1.6以上会报一个警告（angular-devkit/core不存在），需要手动安装 npm i --save-dev @angular-devkit/core

现在运行ng serve 或者 npm start成功启动项目

# 安装angular-Material2

## 首先安装 material cdk animations

npm install --save @angular/material @angular/animations @angular/cdk

## 在安装hummerjs

npm install --save hammerjs

在angular-cli.json里面放入hummerjs的链接并重启项目

```
"scripts": [
  "../node_modules/hammerjs/hammer.min.js"
],
```

## 单独创建一个material模块文件夹

```
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ]
})
export class MaterialModule {}
```

在app.module.ts里面引入该模块

```
import { MaterialModule } from './material';

imports: [
  ...
  MaterialModule
],
```

## 在styless引入主题样式

```
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
```

### 如果要使用图标需要再index.html引入样式

```
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```
