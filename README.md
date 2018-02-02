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

# 安装scss

npm install node-sass --save-dev

将angular-cli.json文件中的styleExt修改为
"defaults": {
     "styleExt": "scss",
}

# 安装 ng-zorro

npm install ng-zorro-antd --save
