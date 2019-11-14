import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridRadioComponent } from './cn-grid-radio.component';

describe('CnGridRadioComponent', () => {
  let component: CnGridRadioComponent;
  let fixture: ComponentFixture<CnGridRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
