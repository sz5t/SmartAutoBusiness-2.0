import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgCarouselComponent } from './cfg-carousel.component';

describe('CfgCarouselComponent', () => {
  let component: CfgCarouselComponent;
  let fixture: ComponentFixture<CfgCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
