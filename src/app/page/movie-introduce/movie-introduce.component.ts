import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../../../api/movie';

@Component({
  selector: 'app-movie-introduce',
  providers: [ Movie ],
  templateUrl: './movie-introduce.component.html',
  styleUrls: ['./movie-introduce.component.scss']
})
export class MovieIntroduceComponent implements OnInit {
  movieDetails: any;
  cardData: any;
  id: number;
  constructor(
    private movie: Movie,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  async getDetails() {
    this.movieDetails = await this.movie.getDetails(this.id);
    this.cardData = {
      type: 'movie',
      list: this.movieDetails.casts
    };
  }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.movieDetails = {};
      this.id = data.id;
      this.getDetails();
    });
  }
  // 返回上一页
  back() {
    this.location.back();
  }
}
