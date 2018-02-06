import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCropComponent } from './img-crop.component';

describe('ImgCropComponent', () => {
  let component: ImgCropComponent;
  let fixture: ComponentFixture<ImgCropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgCropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
