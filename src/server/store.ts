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
