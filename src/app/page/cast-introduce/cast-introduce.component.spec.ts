import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastIntroduceComponent } from './cast-introduce.component';

describe('CastIntroduceComponent', () => {
  let component: CastIntroduceComponent;
  let fixture: ComponentFixture<CastIntroduceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastIntroduceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastIntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
