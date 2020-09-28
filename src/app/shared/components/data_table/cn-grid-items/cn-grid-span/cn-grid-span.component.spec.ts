import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnGridSpanComponent } from './cn-grid-span.component';

describe('CnGridSpanComponent', () => {
  let component: CnGridSpanComponent;
  let fixture: ComponentFixture<CnGridSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnGridSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnGridSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
