import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../../../api/movie';

@Component({
  selector: 'app-cast-introduce',
  providers: [ Movie ],
  templateUrl: './cast-introduce.component.html',
  styleUrls: ['./cast-introduce.component.scss']
})
export class CastIntroduceComponent implements OnInit {
  id: number;
  castDetails: any;
  cardData: any;
  constructor(
    private movie: Movie,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  ngOnInit() {
    // 由于已经被创建，，不会被再次创建，OnInit里面的值保留第一次被创建的值，解决办法参数订阅
    this.route.params.subscribe((data) => {
      this.id = data.id;
      this.getDetails();
    });
  }
  // 获取电影详情
  async getDetails() {
    this.castDetails = await this.movie.getCastDetails(this.id);
    this.cardData = {
      type: 'cast',
      list: this.castDetails.works
    };
  }
  // 返回上一页
  back() {
    this.location.back();
  }

}
