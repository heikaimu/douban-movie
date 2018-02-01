import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})

export class CardListComponent implements OnInit {
  bodyStyle = { padding: 0 };
  cardList = [];

  @Input()
  set cardData (obj: any) {
    console.log(obj);
    if (obj.type === 'movie') {
      this.cardList = obj.list.map(function(item) {
        return {
          url: `/main/castIntroduce/${item.id}`,
          title: item.name,
          avatar: item.avatars.large
        };
      });
    } else if (obj.type === 'cast') {
      this.cardList = obj.list.map(function(item) {
        return {
          url: `/main/movieIntroduce/${item.subject.id}`,
          title: item.subject.title,
          avatar: item.subject.images.large,
          average: item.subject.rating.average
        };
      });
    } else if (obj.type === 'main-movie') {
      this.cardList = obj.list.map(function(item) {
        return {
          url: `/main/movieIntroduce/${item.id}`,
          title: item.title,
          avatar: item.images.large,
          average: item.rating.average
        };
      });
    }
  }
  get cardData(): any {
    return this.cardList;
  }
  constructor() { }

  ngOnInit() {
  }

}
