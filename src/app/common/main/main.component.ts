import { Component, OnInit, HostBinding } from '@angular/core';
import { slideToRight } from '../../animates/router.animate';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    slideToRight
  ]
})
export class MainComponent implements OnInit {
  // 定义路由动画
  @HostBinding('@routerAnimate') state;
  constructor(
  ) { }

  ngOnInit() {
  }

}
