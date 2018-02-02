import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '../../../server/storage';

@Component({
  selector: 'app-slide-nav',
  templateUrl: './slide-nav.component.html',
  styleUrls: ['./slide-nav.component.scss']
})
export class SlideNavComponent implements OnInit {
  isCollapsed = false;
  webNav = [
    {
      title: '电影',
      open: true,
      children: [
        {
          title: '影院热映',
          path: '/main/movie/in_theaters',
          open: true
        },
        {
          title: '即将上映',
          path: '/main/movie/coming_soon',
          open: false
        },
        {
          title: 'TOP250',
          path: '/main/movie/top250',
          open: false
        }
      ]
    }
  ];
  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
  }
  goTo(url) {
    this.storage.set('movie-page-ifo', {});
    this.router.navigate([url]);
  }

}
