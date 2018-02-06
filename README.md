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
```
npm install ng-zorro-antd --save
```
然后在app.module.ts里导入
```
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  imports: [ NgZorroAntdModule.forRoot() ]
})
```

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

## 渲染组件数据时出现某字段undefined
```
<movie-details [details]="details"></movie-details>
```
如果直接这样，特别是异步数据，大几率出现某字段undefined的情况，所以这个时候我们需要再加一个指令ngIf.
```
<movie-details *ngIf="details" [details]="details"></movie-details>
```
这样写就是在数据已经拿到之后再渲染，避免了数据还未拿到就开始渲染出现数据undefined的情况。

# 组件之间通信

## 1. 父传子
parent.component.ts
```
constructor() {
  this.list = [1, 2, 3];
}
```
parent.component.html
```
<children-component [list]="list"></children-component>
```
children.component.ts
```
import {Input} from '@angular/core';
export class children {
  @Input() list: number[] = [1];
  @Input('master') masterName: string;//可以将master换成另外一个名字
}
```
如果需要对传入的值做数据处理则如下：
```
import {Input} from '@angular/core';
export class children {
  newList: number[];
  @Input()
  set list(number: number[]) {
    ....数据处理
    this.newList = ...
  }
  get list(): number[] {
    return this.newList;
  }
}
```

## 2. 子传父
parent.component.ts
```
countChange(event: number) {
    this.changeMsg = `子组件change事件已触发，当前值是: ${event}`;
  }
```
parent.component.html
```
<children-component (change)="countChange($event)"></children-component>
```
children.component.ts
```
import {Output, EventEmitter} from '@angular/core';
export class children {
   count: number = 10;
   @Output() change: EventEmitter<number> = new EventEmitter<number>();
   this.change.emit(this.count);
}
```

## 3. 非父子组件

### 3.1 订阅者发布者模式实现组件传值
新建一个store.ts
```
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Store {
  public currentNav: any;
  public currentPage: any;
  constructor() {
    this.currentNav = new EventEmitter();
    this.currentPage = new EventEmitter();
  }
}
```
注入（一定要在单列下才能正常运行）我选择在app.module.ts里面注入
app.module.ts
```
import { Store } from '../server/store';
@NgModule({
  providers: [
    Store
  ]
}）
```
现在有A、B两个组件需要通信

A.ts
```
import { Store } from '../../../server/store';
export class A {
  constructor(
    private store: Store
  ) {}
  
  // 我们设定当前pageId为5
  this.store.currentNav.emit(5);
}
```
B.ts
```
import { Store } from '../../../server/store';
export class B implements OnInit {
  constructor(
    private store: Store
  ) {}
  
  ngOnInit() {
      // 订阅模式
      this.store.currentNav.subscribe((data) => {
        this.currentNav = data;
      });
    }
}
```
如需要手动取消订阅，则使用代码
```
this.store.currentNav.unsubscribe();
```
### 3.2 公用service实现组件之间传值

创建一个公共service.ts
```
import { Injectable } from '@angular/core';
interface detailsConfig {
  name: string;
  sex: string;
  age: number;
  likes: string[];
}
@Injectable()
export class CommonService {
  public details: detailsConfig;
}
```
注入（一定要在单列下才能正常运行）我选择在app.module.ts里面注入

A，B两个非父子组件通信，A是发射源，B是响应端

A.ts
```
import {CommonService} from '../service.ts';

export class A {
  constructor(
    private commonService: CommonService
  ) {}
  changeType(item) {
    this.commonService.details = item;
  }
}
```
B.ts
```
import {CommonService} from '../service.ts';
interface detailsConfig {
  name: string;
  sex: string;
  age: number;
  likes: string[];
}
export class  {
  currentDetails: detailsConfig;
  constructor(
    private commonService: CommonService
  ) {
    this.currentDetails = this.commonService.details;
  }
}
```
我们把A组件想成是列表，点击之后进入详情B,那么我们可以在点击的时候设置当前详情信息，在路由到B的时候就直接能获取到A的信息

# 路由的跳转的几种写法

## 1. a标签上直接写路由地址

```
<a routerLink="{{'/main/movie/'+id}}"></a>
<a [routerLink]="['/main/movie', id]"></a>
```
## 2. 函数式写法
```
import { Router } from '@angular/router';
export class C {
  constructor(
    private router: Router
  ) {
    this.router.navigate(['/main/movie', id]);
  }
}
```
