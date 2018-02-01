import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebHeaderComponent } from './web-header.component';

describe('WebHeaderComponent', () => {
  let component: WebHeaderComponent;
  let fixture: ComponentFixture<WebHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
