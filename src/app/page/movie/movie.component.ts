import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../../api/movie';
import { Storage } from '../../../server/storage';
import { Store } from '../../../server/store';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-table',
  providers: [ Movie ],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  listData: any;
  _isSearch = false;
  _type: string;
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = true;
  cardData: object;
  listStyle = true;
  constructor(
    private movie: Movie,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private store: Store
  ) { }
  ngOnInit() {
    // 初始的时候搜索为false，搜索内容为null
    this.validateForm = this.fb.group({
      keyword: [ null, [ Validators.required ] ]
    });
    // 根据路由的type参数判断
    this.route.params.subscribe((data) => {
      // 首先获取页面的type
      this._type = data.type;
      if (this._type !== 'search') {
        this._isSearch = false;
        this.validateForm = this.fb.group({
          keyword: [ null, [ Validators.required ] ]
        });
      } else {
        this._isSearch = true;
      }
      // 发布模式（和左侧导航通信）
      this.store.currentNav.emit(this._type);
      this.chargePage();
    });
  }
  // 判断页面
  chargePage() {
    // 获取本地缓存数据
    const moviePageIfo = this.storage.get('movie-page-ifo');
    if (moviePageIfo.type && moviePageIfo.type === this._type) { // 如果当前类别符合storage里面的类别
      this._current = moviePageIfo.pageId;
      this._pageSize = moviePageIfo.pageSize;
      this._total = moviePageIfo.total;
      this.listStyle = moviePageIfo.listStyle;
      if (this._type === 'search') { // 如果是搜索页面
        this._isSearch = true;
        const currentKeyword = typeof(moviePageIfo.keyword) !== 'undefined' ? moviePageIfo.keyword : '';
        this.validateForm = this.fb.group({
          keyword: [ currentKeyword, [ Validators.required ] ]
        });
      } else { // 分类页面
        this._isSearch = false;
        this.validateForm = this.fb.group({
          keyword: [ null, [ Validators.required ] ]
        });
      }
    } else { // 进的新页面则全部重置
      this._current = 1;
      this._pageSize = 10;
      this._total = 10;
      this.listStyle = true;
    }
    this.refreshData();
  }
  // 刷新数据
  refreshData(reset = false) {
    if (reset) {// 强刷
      this._current = 1;
    }
    if (this._isSearch) { // 如果当前是搜索模式
      this.searchData();
    } else { // 正常分类模式
      this.getTypeData();
    }
  }
  // 获取类型列表
  async getTypeData() {
    this._loading = true;
    const params = {
      type: this._type,
      start: this._pageSize * (this._current - 1),
      pageSize: this._pageSize
    };
    this.listData = await this.movie.getList(params);
    this._loading = false;
    this._total = this.listData.total;
    this._dataSet = this.listData.subjects;
    this.cardData = {
      type: 'main-movie',
      list: this.listData.subjects
    };
  }
  // 搜索列表
  async searchData() {
    this._loading = true;
    const params = {
      keyword: this.validateForm.value.keyword,
      start: this._pageSize * (this._current - 1),
      pageSize: this._pageSize
    };
    this.listData = await this.movie.searchMovie(params);
    this._loading = false;
    this._total = this.listData.total;
    this._dataSet = this.listData.subjects;
    this.cardData = {
      type: 'main-movie',
      list: this.listData.subjects
    };
  }
  // 搜索按钮
  handleSearch() {
    this.storage.set('current-nav', 'search');
    this._isSearch = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
    if (this.validateForm.valid) {
      if (this._type === 'search') { // 如果当前是在搜索页面下，点击搜索直接搜索
        this.refreshData(true);
      } else { // 如果不是在搜索页面下，点击则先跳转到搜索页面然后走一遍生命周期
        this.router.navigate(['/main/movie/search']);
      }
    }
  }
  // 改变样式
  changeStyle(b) {
    this.listStyle = b;
  }
  ngOnDestroy() {
    const moviePageIfo = {
      type: this._type,
      pageId: this._current,
      pageSize: this._pageSize,
      total: this._total,
      listStyle: this.listStyle,
      keyword: this.validateForm.value.keyword
    };
    this.storage.set('movie-page-ifo', moviePageIfo);
  }

}
