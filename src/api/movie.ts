import {Injectable} from '@angular/core';
import { HTTP } from '../server/httpServer';
import * as $ from 'jquery';
// 由于豆瓣不支持angular-cli的jsonp，所以用jquery替代了

@Injectable()
export class Movie {
  constructor(
    private http: HTTP
  ) {}
  // 获取电影列表
  getList(params) {
    // return this.http.get(`/v2/movie/${params.type}?start=${params.start}&count=${params.pageSize}`);
    return new Promise(function(resolve, reject){
      $.ajax({
        url: `https://api.douban.com/v2/movie/${params.type}?start=${params.start}&count=${params.pageSize}`,
        type: 'get',
        dataType: 'jsonp',
        success: function(data){
          resolve(data);
        }
      });
    });
  }
  // 搜索电影
  searchMovie(params) {
    // return this.http.get(`/v2/movie/search?q=${params.keyword}&start=${params.start}&count=${params.pageSize}`);
    return new Promise(function(resolve, reject){
      $.ajax({
        url: `https://api.douban.com/v2/movie/search?q=${params.keyword}&start=${params.start}&count=${params.pageSize}`,
        type: 'get',
        dataType: 'jsonp',
        success: function(data){
          resolve(data);
        }
      });
    });
  }
  // 获取电影详情
  getDetails(id: number) {
    // return this.http.get(`/v2/movie/subject/${id}`);
    return new Promise(function(resolve, reject){
      $.ajax({
        url: `https://api.douban.com/v2/movie/subject/${id}`,
        type: 'get',
        dataType: 'jsonp',
        success: function(data){
          resolve(data);
        }
      });
    });
  }
  // 影人信息
  getCastDetails(id: number) {
    // return this.http.get(`/v2/movie/celebrity/${id}`);
    return new Promise(function(resolve, reject){
      $.ajax({
        url: `https://api.douban.com/v2/movie/celebrity/${id}`,
        type: 'get',
        dataType: 'jsonp',
        success: function(data){
          resolve(data);
        }
      });
    });
  }
}
