import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '../../../server/storage';
import { Store } from '../../../server/store';

@Component({
  selector: 'app-slide-nav',
  templateUrl: './slide-nav.component.html',
  styleUrls: ['./slide-nav.component.scss']
})
export class SlideNavComponent implements OnInit, OnChanges {
  isCollapsed = false;
  currentNav: string;
  webNav = [
    {
      title: '电影',
      open: true,
      children: [
        {
          title: '影院热映',
          path: '/main/movie/in_theaters',
          value: 'in_theaters'
        },
        {
          title: '即将上映',
          path: '/main/movie/coming_soon',
          value: 'coming_soon'
        },
        {
          title: 'TOP250',
          path: '/main/movie/top250',
          value: 'top250'
        }
      ]
    }
  ];
  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(
    private router: Router,
    private storage: Storage,
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.currentNav = this.storage.get('current-nav');
      console.log(this.store);
    });
  }
  ngOnChanges() {
    console.log(this.store);
  }
  goTo(nav) {
    this.storage.set('current-nav', nav.value);
    this.storage.set('movie-page-ifo', {});
    this.router.navigate([nav.path]);
  }

}
