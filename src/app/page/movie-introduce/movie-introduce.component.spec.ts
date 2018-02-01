import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieIntroduceComponent } from './movie-introduce.component';

describe('MovieIntroduceComponent', () => {
  let component: MovieIntroduceComponent;
  let fixture: ComponentFixture<MovieIntroduceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieIntroduceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieIntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
