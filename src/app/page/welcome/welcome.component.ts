import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { slideToRight } from '../../animates/router.animate';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    slideToRight
  ]
})
export class WelcomeComponent implements OnInit {
  // 定义路由动画
  @HostBinding('@routerAnimate') state;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/main/movie/in_theaters']);
    }, 2000);
  }

}
