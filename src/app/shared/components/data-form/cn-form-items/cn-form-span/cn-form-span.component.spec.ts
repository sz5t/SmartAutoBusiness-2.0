import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormSpanComponent } from './cn-form-span.component';

describe('CnFormSpanComponent', () => {
  let component: CnFormSpanComponent;
  let fixture: ComponentFixture<CnFormSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
