import { Injectable } from '@angular/core';

@Injectable()
export class Storage {
  get(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
