import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../api/movie';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  providers: [ Movie ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  validateForm: FormGroup;
  movieType = ['剧情', '音乐', '爱情'];
  movieDetails: any;
  id: number;
  constructor(
    private movie: Movie,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }
  async getDetails() {
    this.movieDetails = await this.movie.getDetails(this.id);
    this.validateForm = this.fb.group({
      title          : [ this.movieDetails.title ],
      original_title : [ this.movieDetails.original_title ],
      subtype        : [ this.movieDetails.subtype ],
      genres         : [ this.movieDetails.genres ],
      switch         : [ false ],
      summary        : [ this.movieDetails.summary ]
    });
    console.log(this.movieDetails);
  }
  ngOnInit() {
    // 由于已经被创建，，不会被再次创建，OnInit里面的值保留第一次被创建的值，解决办法参数订阅
    this.route.params.subscribe((data) => {
      this.movieDetails = {};
      this.id = data.id;
      this.validateForm = this.fb.group({
        title          : [],
        original_title : [],
        subtype        : [],
        genres         : [],
        switch         : [],
        summary        : []
      });
      this.getDetails();
    });
  }

}
