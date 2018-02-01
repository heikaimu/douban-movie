import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../api/movie';
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
export class TableComponent implements OnInit {
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
  listStyle = false;
  constructor(
    private movie: Movie,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }
  // 刷新数据
  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }
    if (this._isSearch) {
      this.searchData();
    } else {
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
  ngOnInit() {
    this.validateForm = this.fb.group({
      keyword: [ null, [ Validators.required ] ]
    });
    this.route.params.subscribe((data) => {
      this._type = data.type;
      this.refreshData(true);
    });
  }
  // 搜索按钮
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
    if (this.validateForm.valid) {
      this._isSearch = false;
      this._isSearch = true;
      this.refreshData(true);
    }
  }
  // 改变样式
  changeStyle(b) {
    this.listStyle = b;
  }
  // 删除列表
  confirm = (data) => {
    console.log(data);
  }

}
